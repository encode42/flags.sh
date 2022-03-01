import { useEffect, useState } from "react";
import { Slider, SliderProps } from "@mantine/core";

interface SliderMarker {
    "value": number,
    "label": string
}

/**
 * Options for the marked slider.
 */
interface MarkedSliderOptions extends SliderProps {
    /**
     * Interval in which markers are generated.
     */
    "interval"?: number,

    /**
     * Whether to include markers at the start and end of the slider.
     */
    "includeEnds"?: boolean
}

/**
 * A slider with generated markers.
 *
 * @see MarkedSliderOptions
 */
export default function MarkedSlider({ interval = 1, includeEnds = false, step = 1, min = 0, max = 100, defaultValue = 0, thumbLabel, label, onChange }: MarkedSliderOptions) {
    // Generate the markers
    const [marks, setMarks] = useState<SliderMarker[]>([]);
    useEffect(() => {
        const newSliderMarks: SliderMarker[] = [];

        // Iterate each interval between min and max
        for (let i = min; i <= max; i += step) {
            // Check whether we're at the ends
            if (!includeEnds && (i === min || i === max)) {
                continue;
            }

            if (i % interval === 0 || i === min || i === max) {
                // Current value is divisible by interval
                newSliderMarks.push({
                    "value": i,
                    "label": `${i} GB`
                });
            }
        }

        setMarks(newSliderMarks);
    }, [interval, includeEnds, step, min, max]);

    return (
        <Slider marks={marks} step={step} min={min} max={max} defaultValue={defaultValue} thumbLabel={thumbLabel} label={label} onChange={onChange} />
    );
}
