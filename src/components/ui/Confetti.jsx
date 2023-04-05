import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactConfetti = dynamic(() => import("react-confetti"), {
	ssr: false,
});

export default function Confetti() {
	const [isBrowser, setBrowser] = useState(false);

	useEffect(() => {
		setBrowser(true);
	}, []);

	return (
		<div className="absolute top-0 left-0 w-screen h-screen m-auto">
			<div className="fixed" style={{ zIndex: "55" }}>
				{isBrowser && (
					<ReactConfetti
						width={window.innerWidth}
						height={window.innerHeight}
						colors={[
							"#79CA25",
							"#5AB510",
							"#479E00",
							"#1E7F2D",
							"#7AB510",
							"#5AB510",
							"#479E00",
							"#1E7F2D",
							"#79CA25",
							"#5AB510",
							"#79CA25",
							"#1E7F2D",
							"#7AB510",
							"#5AB510",
							"#79CA25",
							"#1E7F2D",
						]}
						initialVelocityY={800}
						numberOfPieces={1200}
						friction={0.94}
						gravity={0.2}
					/>
				)}
			</div>
		</div>
	);
}
