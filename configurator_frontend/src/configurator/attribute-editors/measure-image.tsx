import useMeasure from "react-use-measure";
import { useMemo, useState } from "react";
import { Layer, Line, Stage } from 'react-konva';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const normalizeCoordinates = (coord: Point, width: number, height: number) => ({
    x: coord.x / width, y: coord.y / height
});
  
const denormalizeCoordinates = (coord: Point, width: number, height: number) => ({
    x: coord.x * width, y: coord.y * height
});

export type Point = { x: number, y: number }

export type ImageMeasureCallback = (start: Point, end: Point, distance: number) => void | Promise<void>;

export function MeasureImage({ image, onDone }: { image: string; onDone: ImageMeasureCallback; }) {
    const [ref, { width: imageWidth, height: imageHeight }] = useMeasure();
    const [distance, setDistance] = useState<number>(0);
  
    const [drawing, setDrawing] = useState(false);
  
    const [startPoint, setStartPoint] = useState<Point | null>(null);
    const [endPoint, setEndPoint] = useState<Point | null>(null);
  
  
    const linePoints = useMemo(() => {
      if (startPoint === null || endPoint === null) {
        return null;
      }
      const startPx = denormalizeCoordinates(startPoint, imageWidth, imageHeight);
      const endPx = denormalizeCoordinates(endPoint, imageWidth, imageHeight);
      return [startPx.x, startPx.y, endPx.x, endPx.y];
    }, [imageWidth, imageHeight, startPoint, endPoint]);
  
    const onSubmit = () => {
      if (!startPoint || !endPoint || !distance) {
        return
      }
      onDone(
        startPoint,
        endPoint,
        distance
      )
    }
  
    return <div>
      <div>
        <h1 className='text-2xl font-bold mt-2'>Draw a line & input its length</h1>
        <ul className='list-disc ps-4 text-lg mt-2 text-foreground/50'>
          <li>
            Draw a line over any feature on your building photo whose length you know and input its length.
          </li>
          <li>
            For example you could draw a line over door and enter its length.
          </li>
        </ul>
      </div>
      <div className='relative max-w-full mt-6'>
        <div className='w-full'>
          <img
            ref={ref} 
            src={image} 
            className='w-full h-auto'
            />
        </div>
        <div className='absolute z-10 inset-0'>
          <Stage
            onMouseDown={(e) => {
              setDrawing(d => !d);
              // you were drawing before
              if (drawing) {
                return
              }
              const pointerPos = e.target?.getStage()?.getPointerPosition();
              if (!pointerPos) {
                return
              }
              setStartPoint(normalizeCoordinates(pointerPos, imageWidth, imageHeight));
              setEndPoint(null);
            }}
            onMouseMove={(e) => {
              if (!drawing) {
                return;
              }
              const pointerPos = e.target?.getStage()?.getPointerPosition();
              if (!pointerPos) {
                return;
              }
              setEndPoint(normalizeCoordinates(pointerPos, imageWidth, imageHeight));
            }}
            width={imageWidth}
            height={imageHeight}>
            <Layer>
              {
                (linePoints !== null) && (
                  <>
                    <Line
                      points={linePoints}
                      stroke='blue'
                      strokeWidth={4}
                      // dash={[10, 5]}
                    />
                  </>
                )
              }
            </Layer>
          </Stage>
        </div>
      </div>
      <div className='mt-4'>
        <label htmlFor='line_length'>Length of line (in meters)</label>
        <Input
          id='line_length'
          type='number'
          placeholder='width'
          className="mt-2"
          value={distance}
          onChange={e => setDistance(parseFloat(e.target.value!))}
        />
        <Button 
          disabled={!startPoint || !endPoint || !distance}
          className='w-full mt-4' 
          onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
}
