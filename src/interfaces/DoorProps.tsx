export interface DoorProps {
    play: boolean;
    onAnimationComplete: () => void;
    doorOpenFrame?: number;
    gameComponent?: React.ReactNode;
}