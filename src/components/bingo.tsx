import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useRest, {Card} from "./api";

const Bingo = () => {
	const [playerData, joinGame, checkWin, isChecked, error] = useRest();

	const [gameId, setGameId] = useState<string>("");
	if (playerData) {
		console.log();
	}
	return (
		<Box>
			{!isChecked && playerData === undefined && (
				<div>
					<h2 style={{ textAlign: "center", fontSize: "2rem" }}>
						Enter Game ID!
					</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							joinGame(gameId);
						}}>
						{error && (
							<p style={{
									left: "3rem",
									color: "Red",
									fontSize: ".8rem",
								}}>
								Game doesn't exist, Please try again.
							</p>
						)}
						<TextField
							value={gameId}
							onChange={(e) => setGameId(e.target.value)}
							variant="outlined"
							label="Game ID"
							autoComplete="off"
						/>
						<Button type="submit">
							Join
						</Button>
					</form>
				</div>
			)}

			{isChecked && playerData && (
				<div> <Button
							onClick={() => {checkWin()}}
							variant="contained"
							sx={{
								fontSize: ".6rem",
								position: "absolute",
								top: "20px",
								left: "100px",
							}}>
							Check Win
						</Button>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(5,2fr)",
						}}>
						{Object.keys(playerData.card).map((key: string) => {
							return (
								<div className="">
									<h1
										style={{
											padding: "0rem 2rem",
											fontSize: "2rem",
											marginBottom: "1rem",
											fontWeight: "bold",
										}}>
										{key}
									</h1>
									{playerData.card[key as keyof Card].map(
										(num: number, index: number) => {
											return (
												<div>
													{num}
												</div>
											);
										}
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</Box>
	);
};

export default Bingo;