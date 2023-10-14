import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export interface PlayerData {
	playcard_token: string;
	card: Card;
}
export interface Card {
	B: number[];
	I: number[];
	N: number[];
	G: number[];
	O: number[];
}
const useRest = (): [
	PlayerData | undefined,
	(id: string) => void,
	() => void,
	boolean,
	boolean
] => {
	const [playerData, setPlayerData] = useState<PlayerData>();
	const [isChecked, setChecked] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const joinGame = async (id: string) => {
		const config: AxiosRequestConfig = {
			method: "GET",
			url: `http://hyeumine.com/getcard.php?bcode=${id}`,
		};
		await axios(config).then((res) => {
			console.log(res);
			if (res.data !== 0) {
				setPlayerData(res.data);
				setChecked(true);
			} else {
				setError(true);
			}
		});
	};
	const checkWin = async () => {
		const config: AxiosRequestConfig = {
			method: "GET",
			url: `http://hyeumine.com/checkwin.php?playcard_token=${playerData?.playcard_token}`,
		};
		await axios(config).then((res) => {
			alert(res.data ? "You won!" : "Not yet!");
		});
	};

	return [playerData, joinGame, checkWin, isChecked, error];
};

export default useRest;
