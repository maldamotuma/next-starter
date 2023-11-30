import { useEffect, useRef } from "react";

export const usePrevious = (state: any) => {
    const prevRef = useRef<any>();
    useEffect(() => {
        prevRef.current = state
    }, [state]);

    return prevRef.current;

}