import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface PieSlice {
  id: string;
  label: string;
  percentage: number;
  value: number;
  color: string;
  explanation: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
  selectedSlice: string | null;
  onSlicePress: (sliceId: string | null) => void;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  selectedSlice,
  onSlicePress
}) => {
  // Filter out zero values and calculate total
  const filteredData = data.filter(item => Math.abs(item.percentage) > 0);
  
  if (filteredData.length === 0) {
    return (
      <View style={{ 
        width: size, 
        height: size, 
        borderRadius: size / 2, 
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ color: '#666', fontSize: 14 }}>No Data</Text>
      </View>
    );
  }

  const radius = size / 2 - 10; // Leave some margin
  const centerX = size / 2;
  const centerY = size / 2;
  const innerRadius = radius * 0.4; // Create donut effect

  // Helper function to create SVG path for pie slice
  const createPieSlice = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Calculate angles for each slice
  const total = filteredData.reduce((sum, item) => sum + Math.abs(item.percentage), 0);
  let currentAngle = 0;

  const slices = filteredData.map((slice) => {
    const sliceAngle = (Math.abs(slice.percentage) / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    const isSelected = selectedSlice === slice.id;
    
    const path = createPieSlice(startAngle, endAngle, radius, innerRadius);
    
    // Calculate label position
    const labelAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius + 20;
    const labelPosition = polarToCartesian(centerX, centerY, labelRadius, labelAngle);
    
    currentAngle += sliceAngle;

    return {
      ...slice,
      path,
      startAngle,
      endAngle,
      sliceAngle,
      isSelected,
      labelPosition
    };
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size, position: 'relative' }}>
        <Svg width={size} height={size}>
          {slices.map((slice) => (
            <Path
              key={slice.id}
              d={slice.path}
              fill={slice.color}
              opacity={slice.isSelected ? 1 : selectedSlice ? 0.3 : 0.8}
              stroke="#fff"
              strokeWidth={2}
              onPress={() => onSlicePress(slice.isSelected ? null : slice.id)}
            />
          ))}
          
          {/* Center circle for donut effect */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill="#fff"
            stroke="#e0e0e0"
            strokeWidth={1}
          />
        </Svg>

        {/* Center label */}
        <View style={{
          position: 'absolute',
          top: centerY - 20,
          left: centerX - 30,
          width: 60,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '600', 
            color: '#333',
            textAlign: 'center'
          }}>
            Portfolio
          </Text>
        </View>

        {/* Percentage labels */}
        {slices.map((slice) => {
          if (slice.sliceAngle < 20) return null; // Don't show labels for very small slices
          
          return (
            <View
              key={`label-${slice.id}`}
              style={{
                position: 'absolute',
                left: slice.labelPosition.x - 15,
                top: slice.labelPosition.y - 10,
                width: 30,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{
                fontSize: 10,
                fontWeight: '600',
                color: slice.color,
                textAlign: 'center'
              }}>
                {Math.abs(slice.percentage)}%
              </Text>
            </View>
          );
        })}
      </View>

      {/* Touch areas for better interaction */}
      <View style={{ position: 'absolute', width: size, height: size }}>
        {slices.map((slice) => {
          // Create invisible touch areas for each slice
          const midAngle = slice.startAngle + slice.sliceAngle / 2;
          const touchRadius = radius * 0.7;
          const touchPosition = polarToCartesian(centerX, centerY, touchRadius, midAngle);
          
          return (
            <TouchableOpacity
              key={`touch-${slice.id}`}
              style={{
                position: 'absolute',
                left: touchPosition.x - 20,
                top: touchPosition.y - 20,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'transparent'
              }}
              onPress={() => onSlicePress(slice.isSelected ? null : slice.id)}
              activeOpacity={0.8}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PieChart;
