import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll():Movie[] {
        return this.movieService.getAll();
    }

    @Get('search')
    seearch(@Query('year') searchingYear){
        return `search searchingYear:${searchingYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId:number): Movie{
        const movie = this.movieService.getOne(movieId);
        if (!movie){
            throw new NotFoundException("Movie not found");
        }else{
            return movie;
        }
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.movieService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId:number){
        return this.movieService.deleteOne(movieId);
    }

    @Patch('/:id')
    path(@Param('id') movieId:number, @Body() movieData: UpdateMovieDto){
        return this.movieService.update(movieId, movieData);
    }

}
