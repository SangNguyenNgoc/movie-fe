import React, {useCallback, useEffect, useState} from 'react';
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "../ui/Dialog";
import {StarIcon} from "@heroicons/react/16/solid";
import {SquarePen, Star} from "lucide-react";
import {TMovieDetail} from "../../app/types/movie/MovieDetail.types";
import movieService from "../../app/services/movie.service";
import axios from "axios";

interface RatingProps {
    movieDetail: TMovieDetail
}

const starRate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const getStarColor = (starIndex: number, hoverIndex: number, ratingPoint: number) =>
    starIndex <= hoverIndex || starIndex <= ratingPoint ? "text-yellow-600" : "";

const Rating = ({movieDetail} : RatingProps) => {

    const [hoverIndex, setHoverIndex] = useState(0)
    const [ratingPoint, setRatingPoint] = useState(0)
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [rated, setRated] = useState<number | null>(null)

    const handleChangeStar = useCallback((starIndex: number) => {
        setHoverIndex(starIndex);
    }, []);

    const handleRating = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await movieService.ratingMovie(movieDetail.slug, ratingPoint);
            setRated(ratingPoint)
            setOpen(false)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setError("Bạn đã đánh giá rồi!");
            } else {
                setError("Đã xảy ra lỗi khi gửi đánh giá.");
            }
        }
    };

    useEffect(() => {
        if (!open) {
            setRatingPoint(0);
            setHoverIndex(0);
            setError(null);
        }
    }, [open]);

    return (
        <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-items-start mt-3 cursor-pointer">
                    <div className="flex justify-items-start items-center space-x-1 pe-2">
                        <StarIcon className="w-8 h-8 text-yellow-300 text-opacity-60"/>
                        {rated ?
                            <p className="font-bold text-label text-2xl">{movieDetail.numberOfRatings + 1 === 0 ? 0 : movieService.getRating(movieDetail.sumOfRatings + rated,movieDetail.numberOfRatings + 1).toString()}</p>
                            :
                            <p className="font-bold text-label text-2xl">{movieDetail.numberOfRatings === 0 ? 0 : movieService.getRating(movieDetail.sumOfRatings, movieDetail.numberOfRatings).toString()}</p>
                        }
                    </div>
                    <div className="flex justify-items-start items-end">
                        {rated ?
                            <p className="text-placeholder">( {movieDetail.numberOfRatings + 1} Votes )</p>
                            :
                            <p className="text-placeholder">( {movieDetail.numberOfRatings} Votes )</p>
                        }
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="bg-gray-200 border-none p-0 w-80 rounded-md">
                <DialogTitle></DialogTitle>
                <div
                    style={{
                        backgroundImage: `url(${movieDetail.horizontalPoster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="aspect-[16/10] w-full"
                ></div>
                <div className="flex flex-col justify-start items-center bg-gray-200 h-52 font-inter gap-3">
                    <p className="capitalize font-semibold text-gray-800">{movieDetail.subName}</p>
                    {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
                    <div className="rounded-full h-24 w-24 border-primary500 border flex flex-col justify-center items-center gap-1">
                        <div className="flex justify-items-start items-center space-x-1 pe-2">
                            <StarIcon className="w-5 h-5 text-yellow-600 text-opacity-60"/>
                            <p className="font-bold text-lg">{movieDetail.numberOfRatings === 0 ? 0 : Math.floor(movieDetail.sumOfRatings / movieDetail.numberOfRatings).toString()}</p>
                        </div>
                        <div className="flex justify-items-start items-end text-xs">
                            <p>({movieDetail.numberOfRatings} Đánh giá)</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-xs gap-x-0.5 cursor-pointer px-5" onMouseLeave={() => setHoverIndex(0)}>
                        {starRate.map(item =>
                            <div
                                key={item}
                                onClick={() => setRatingPoint(item)}
                                onMouseEnter={() => handleChangeStar(item)}
                                className="p-0.5"
                            >
                                <Star className={`h-4 w-4 ${getStarColor(item, hoverIndex, ratingPoint)}`}></Star>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center font-inter text-sm">
                    <DialogClose
                        className="w-1/2 flex justify-center items-center h-10 bg-gray-300 rounded-bl-md">
                        Đóng
                    </DialogClose>
                    <button
                        disabled={ratingPoint === 0}
                        onClick={handleRating}
                        className="w-1/2 flex justify-center items-center h-10 bg-primary500 rounded-br-md bg-opacity-70 hover:bg-opacity-100 transition-opacity duration-500 ease-in-out text-label gap-1">
                        <SquarePen className="w-4 h-4"/>
                        Xác nhận
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Rating;