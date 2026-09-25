"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
	images: string[];
	index: number;
	alt?: string;
	onClose: () => void;
	onChange: (i: number) => void;
};

export default function ImageLightbox({
	images,
	index,
	alt = "",
	onClose,
	onChange,
}: Props) {
	const total = images.length;
	const touchStartX = useRef<number | null>(null);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
			if (e.key === "ArrowRight") onChange((index + 1) % total);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [index, total, onClose, onChange]);

	// Prevent the page behind the lightbox from scrolling
	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return;
		const delta = e.changedTouches[0].clientX - touchStartX.current;
		if (Math.abs(delta) > 60) {
			if (delta > 0) onChange((index - 1 + total) % total);
			else onChange((index + 1) % total);
		}
		touchStartX.current = null;
	};

	return (
		<div
			className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				onClick={onClose}
				aria-label="Close"
				className="absolute top-4 right-4 z-20 w-11 h-11 grid place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
			>
				<X className="w-5 h-5" />
			</button>

			<div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold tabular-nums">
				{index + 1} / {total}
			</div>

			{total > 1 && (
				<>
					<button
						type="button"
						onClick={() => onChange((index - 1 + total) % total)}
						aria-label="Previous"
						className="hidden md:grid absolute top-1/2 left-6 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
					<button
						type="button"
						onClick={() => onChange((index + 1) % total)}
						aria-label="Next"
						className="hidden md:grid absolute top-1/2 right-6 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</>
			)}

			<div
				className="absolute inset-0 flex items-center justify-center px-4 py-16"
				onClick={onClose}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
			>
				<div
					className="relative w-full h-full max-w-6xl"
					onClick={(e) => e.stopPropagation()}
				>
					<Image
						key={index}
						src={images[index]}
						alt={`${alt} ${index + 1}`}
						fill
						sizes="100vw"
						priority
						className="object-contain"
					/>
				</div>
			</div>

			{total > 1 && (
				<p className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[11px] z-10">
					← swipe →
				</p>
			)}
		</div>
	);
}
