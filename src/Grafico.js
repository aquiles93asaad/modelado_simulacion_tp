import React, { useEffect, useState } from 'react';
import { Chart, Line, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';

const defaultData = [{ x: 0, y: 0 }];

const Grafico = ({data, color}) => {
  const [dataSet, setDataSet] = useState(defaultData);
  const [values, setValues] = useState({
    minX: 0,
    maxX: 5,
    minY: 0,
    maxY: 5,
  });

  useEffect(() => {
    if (data && data.length !== 0) {
      const newData = data.map(item => {
        return { x: item.t, y: item.x}
      });
      const newValues = {...values};
      newData.forEach(item => {
        if (item.x < newValues.minX) {
          newValues.minX = item.x - 1;
        }
        if (item.x > newValues.maxX) {
          newValues.maxX = item.x + 1;
        }
        if (item.y < newValues.miny) {
          newValues.minY = item.y - 1;
        }
        if (item.y > newValues.maxY) {
          newValues.maxY = item.x + 1;
        }
      });
      setDataSet(newData);
      setValues(newValues);
    }
  }, [data]);

  const getTickValues = (min, max) => {
    const result = [min];
    let value = min;
    while (value < max) {
      result.push(value + 2);
      value += 2;
    }
    result.push(max);
    return result;
  }

  return (
    <Chart
      style={{ height: 200, width: '100%' }}
      data={dataSet}
      padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
      xDomain={{ min: values.minX, max: values.maxX }}
      yDomain={{ min: values.minY, max: values.maxY }}
      viewport={{ size: { width: 5 } }}
    >
      <VerticalAxis
        tickValues={getTickValues(values.minY, values.maxY)}
        theme={{
          axis: { stroke: { color: '#aaa', width: 2 } },
          ticks: { stroke: { color: '#aaa', width: 2 } },
          labels: { formatter: (v) => v.toFixed(0) },
        }}
      />
      <HorizontalAxis
        tickValues={getTickValues(values.minX, values.maxX)}
        theme={{
          axis: { stroke: { color: '#aaa', width: 2 } },
          ticks: { stroke: { color: '#aaa', width: 2 } },
          labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(0) },
        }}
      />
      <Line
        theme={{
          stroke: { color: color, width: 2 },
        }}
        smoothing="cubic-spline"
      />
    </Chart>
  );
};

export default Grafico;
