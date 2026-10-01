import uuid
import re
import os
import requests
from django.shortcuts import get_object_or_404
from django.http import StreamingHttpResponse, HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken

from .models import Movie, Contract
from .serializers import MovieSerializer

LOCAL_ASSET_PATHS = {
    "Avengers: Endgame": "/home/divyansh_1410/Downloads/Assestass/Avengers.Endgame.2019.Hindi-English.720p.10Bit.HEVC.BluRay.x265-1Vegamovies.tw.mp4",
    "Blade Runner 2049": "/home/divyansh_1410/Downloads/Assestass/Blade Runner 2049 (2017) {Hindi-English} 720p ESub Vegamovies.NL.mp4",
    "Fight Club": "/home/divyansh_1410/Downloads/Assestass/Fight.Club.1999.720p.Hindi-English.Vegamovies.is.mp4",
    "Inception": "/home/divyansh_1410/Downloads/Assestass/Inception.(2010).720p.Dual.Audio.(Hin-Eng).[Vegamovies.NL].mp4",
    "Interstellar": "/home/divyansh_1410/Downloads/Assestass/Interstellar.2014.BluRay.IMAX.720p.x265.HEVC.10bit.Hindi.English.AAC.5.1.ESub.Vegamovies.To.mp4",
    "John Wick": "/home/divyansh_1410/Downloads/Assestass/John.Wick.1.(2014).720p.(Hin.Eng)[MoviesFlix.in].mp4",
    "Oppenheimer": "/home/divyansh_1410/Downloads/Assestass/Oppenheimer.2023.720p.HEVC.BluRay.ORG.DUAL.AAC2.0.x265.ESub.Vegamovies.to.mp4",
    "Spider-Man: Across the Spider-Verse": "/home/divyansh_1410/Downloads/Assestass/Spider-Man.Across.the.Spider-Verse.2023.720p.10bit.BluRay.Hindi.English.ESubs.Vegamovies.to.mp4",
    "Suzume": "/home/divyansh_1410/Downloads/Assestass/Suzume.2022.WebDl.720P.Japanese..Vegamovies.to.mp4",
    "The Dark Knight": "/home/divyansh_1410/Downloads/Assestass/The.Dark.Knight.(2008).720p.Dual.Audio.(Hin-Eng).Vegamovies.NL.mp4",
    "The Matrix Resurrections": "/home/divyansh_1410/Downloads/Assestass/The.Matrix.Resurrections.2021.720p.10Bit.WEB-DL.Hindi.5.1-English.HEVC.x265-Vegamovies.NL.mp4",
    "Whiplash": "/home/divyansh_1410/Downloads/Assestass/Whiplash.2014.720p.BluRay.x264.(English With Subtitles).Vegamovies.NL.mp4",
    "Your Name": "/home/divyansh_1410/Downloads/Assestass/Your.Name.(2016).720p.Dual.Audio.(Hin-Eng).Vegamovies.NL.mp4"
}

def get_authenticated_user_id(request):
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        try:
            token = AccessToken(auth_header.split(' ')[1])
            return str(token['sub']), token.get('role', 'viewer')
        except Exception:
            return None, None
    return None, None

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def movies_collection(request):
    if request.method == 'GET':
        genre = request.GET.get('genre')
        stream_type = request.GET.get('stream_type')
        search = request.GET.get('search')

        qs = Movie.objects.filter(is_published=True).order_by('-created_at')

        if stream_type:
            qs = qs.filter(stream_type=stream_type)

        if search:
            qs = qs.filter(title__icontains=search)

        movies = list(qs)

        # In-memory filter for JSON genres
        if genre:
            genre_lower = genre.lower()
            movies = [m for m in movies if any(g.lower() == genre_lower for g in (m.genres or []))]

        data = MovieSerializer(movies, many=True).data

        # Ensure video_url points to our streaming proxy while exposing direct_video_url for high-speed client playback
        for item in data:
            if item.get('stream_type') == 'full' and item.get('video_url'):
                item['direct_video_url'] = item.get('video_url')
                item['video_url'] = request.build_absolute_uri(f"/api/movies/{item['id']}/stream")

        return Response(data)

    elif request.method == 'POST':
        user_id, role = get_authenticated_user_id(request)
        if not user_id or role not in ['studio', 'admin']:
            return Response({'detail': 'Studio partner authentication required'}, status=status.HTTP_403_FORBIDDEN)

        payload = request.data
        movie = Movie.objects.create(
            id=str(uuid.uuid4()),
            title=payload.get('title'),
            description=payload.get('description'),
            genres=payload.get('genres', []),
            release_year=payload.get('release_year', 2024),
            duration_minutes=payload.get('duration_minutes', 120),
            rating=payload.get('rating', 'PG-13'),
            imdb_score=payload.get('imdb_score', 8.0),
            imdb_id=payload.get('imdb_id'),
            director=payload.get('director'),
            cast=payload.get('cast', []),
            tags=payload.get('tags', []),
            stream_type=payload.get('stream_type', 'full'),
            trailer_youtube_id=payload.get('trailer_youtube_id'),
            poster_url=payload.get('poster_url'),
            backdrop_url=payload.get('backdrop_url'),
            video_url=payload.get('video_url'),
            studio_id=user_id,
            is_published=True
        )

        res_data = MovieSerializer(movie).data
        if movie.stream_type == 'full' and movie.video_url:
            res_data['direct_video_url'] = movie.video_url
            res_data['video_url'] = request.build_absolute_uri(f"/api/movies/{movie.id}/stream")

        return Response(res_data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    data = MovieSerializer(movie).data
    if movie.stream_type == 'full' and movie.video_url:
        data['direct_video_url'] = movie.video_url
        data['video_url'] = request.build_absolute_uri(f"/api/movies/{movie.id}/stream")
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def movie_recommendations(request, movie_id):
    target = get_object_or_404(Movie, id=movie_id)
    target_genres = set(g.lower() for g in (target.genres or []))

    all_movies = Movie.objects.exclude(id=movie_id).filter(is_published=True)
    scored = []
    for m in all_movies:
        score = 0
        m_genres = set(g.lower() for g in (m.genres or []))
        shared = target_genres.intersection(m_genres)
        score += len(shared) * 3
        if target.director and m.director and target.director.lower() == m.director.lower():
            score += 4
        if target.stream_type == m.stream_type:
            score += 1
        scored.append((score, m))

    scored.sort(key=lambda x: x[0], reverse=True)
    recs = [item[1] for item in scored[:6]]
    data = MovieSerializer(recs, many=True).data
    for item in data:
        if item.get('stream_type') == 'full' and item.get('video_url'):
            item['direct_video_url'] = item.get('video_url')
            item['video_url'] = request.build_absolute_uri(f"/api/movies/{item['id']}/stream")
    return Response(data)

def stream_movie(request, movie_id):
    """
    HTTP 206 Byte-Range Streaming Engine (RFC 7233).
    Proxies Fileditch or local master MP4 seamlessly while shielding the direct URL.
    """
    movie = get_object_or_404(Movie, id=movie_id)
    range_header = request.META.get('HTTP_RANGE', '').strip()

    # 1. Check if local MP4 file exists first for zero-latency local playback
    local_path = LOCAL_ASSET_PATHS.get(movie.title)
    if local_path and os.path.exists(local_path):
        file_size = os.path.getsize(local_path)
        if not range_header:
            def file_iter():
                with open(local_path, 'rb') as f:
                    while chunk := f.read(1024 * 1024):
                        yield chunk
            resp = StreamingHttpResponse(file_iter(), content_type="video/mp4")
            resp['Content-Length'] = str(file_size)
            resp['Accept-Ranges'] = 'bytes'
            return resp

        # Parse Range: bytes=start-end
        match = re.match(r'bytes=(\d+)-(\d+)?', range_header)
        if not match:
            return HttpResponse(status=416)

        start = int(match.group(1))
        end = int(match.group(2)) if match.group(2) else file_size - 1
        chunk_window = 4 * 1024 * 1024 # 4MB
        end = min(end, start + chunk_window - 1)
        content_length = end - start + 1

        def range_iter():
            with open(local_path, 'rb') as f:
                f.seek(start)
                remaining = content_length
                while remaining > 0:
                    read_len = min(128 * 1024, remaining)
                    buf = f.read(read_len)
                    if not buf:
                        break
                    remaining -= len(buf)
                    yield buf

        resp = StreamingHttpResponse(range_iter(), status=206, content_type="video/mp4")
        resp['Content-Range'] = f"bytes {start}-{end}/{file_size}"
        resp['Accept-Ranges'] = 'bytes'
        resp['Content-Length'] = str(content_length)
        return resp

    # 2. Proxy Fileditch Upstream Stream
    fileditch_url = movie.video_url
    if not fileditch_url or not fileditch_url.startswith('http'):
        return HttpResponse("Media stream asset not configured", status=404)

    req_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Referer': 'https://fileditch.com/',
    }
    if range_header:
        req_headers['Range'] = range_header

    try:
        upstream = requests.get(fileditch_url, headers=req_headers, stream=True, timeout=15)
        # If .st failed or challenged, attempt mirror .me
        if (upstream.status_code >= 400 or 'text/html' in upstream.headers.get('Content-Type', '')) and 'fileditchfiles.st' in fileditch_url:
            mirror_url = fileditch_url.replace('fileditchfiles.st', 'fileditchfiles.me')
            try:
                mirror_resp = requests.get(mirror_url, headers=req_headers, stream=True, timeout=10)
                if mirror_resp.status_code < 400:
                    upstream = mirror_resp
            except Exception:
                pass
        
        def upstream_iter():
            for chunk in upstream.iter_content(chunk_size=128 * 1024):
                if chunk:
                    yield chunk

        resp = StreamingHttpResponse(
            upstream_iter(),
            status=upstream.status_code,
            content_type=upstream.headers.get('Content-Type', 'video/mp4')
        )
        for h in ['Content-Range', 'Accept-Ranges', 'Content-Length']:
            if h in upstream.headers:
                resp[h] = upstream.headers[h]
        return resp

    except Exception as e:
        return HttpResponse(f"Upstream stream error: {str(e)}", status=502)

@api_view(['GET'])
@permission_classes([AllowAny])
def omdb_search(request):
    """
    OMDb Universal Movie Gateway:
    Proxies OMDb to search any movie worldwide with real IMDb posters and metadata.
    """
    query = request.GET.get('q', '').strip()
    imdb_id = request.GET.get('i', '').strip()

    if imdb_id:
        url = f"http://www.omdbapi.com/?i={imdb_id}&plot=full&apikey=thewdb"
    elif query:
        url = f"http://www.omdbapi.com/?s={requests.utils.quote(query)}&apikey=thewdb"
    else:
        return Response({'results': []})

    try:
        res = requests.get(url, timeout=5)
        data = res.json()
        if 'Search' in data:
            results = []
            for item in data['Search'][:12]:
                results.append({
                    'imdbID': item.get('imdbID'),
                    'title': item.get('Title'),
                    'year': item.get('Year'),
                    'poster': item.get('Poster') if item.get('Poster') != 'N/A' else 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
                    'type': item.get('Type', 'movie')
                })
            return Response({'results': results})
        return Response(data)
    except Exception as e:
        return Response({'error': str(e), 'results': []}, status=500)
