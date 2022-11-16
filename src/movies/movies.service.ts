import { Injectable } from '@nestjs/common';
import { DEFAULT_DEPRECATION_REASON } from 'graphql';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        return this.movies.find(movie => movie.id === id);
    }

    deleteOne(id:number){
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto){
        this.movies.push(
            {
                id: this.movies.length+1,
                ...movieData
            }
        )
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
