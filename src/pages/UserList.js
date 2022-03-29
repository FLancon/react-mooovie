import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

const UserList = () => {
	const [listData, setListData] = useState([]);
	const [sortOldNew, setSortOldNew] = useState(null);
	const moviesDataReversed = movieData.reverse();

	useEffect(() => {
		let moviesId = window.localStorage.movies
			? window.localStorage.movies.split(",")
			: [];

		for (let i = 0; i < moviesId.length; i++) {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=298de76ca90b3ef85d82b83110cf69d6&language=fr-FR`
				)
				.then((res) =>
					setListData((listData) => [...listData, res.data])
				);
		}
	}, []);
	return (
		<div className="user-list-page">
			<Header />
			<h2>
				Coup de coeur <span>❤️</span>
			</h2>

			<div className="btn-sort-container">
				<div
					className="btn-sort"
					id="goodToBad"
					onClick={(e) => setSortOldNew("oldToNew")}
				>
					Récents<span>→</span>
				</div>
				<div
					className="btn-sort"
					id="badToGood"
					onClick={(e) => setSortOldNew("newToOld")}
				>
					Anciens<span>→</span>
				</div>
			</div>

			<div className="result">
				{listData.length > 0 ? (
					sortOldNew === "oldToNew" ? (
						listData.map((movie) => (
							<Card movie={movie} key={movie.id} />
						))
					) : (
						listData
							.reverse()
							.map((movie) => (
								<Card movie={movie} key={movie.id} />
							))
					)
				) : (
					<h2>
						Vous n'avez aucun coup de coeur <span>💔</span>
					</h2>
				)}
			</div>
		</div>
	);
};

export default UserList;
