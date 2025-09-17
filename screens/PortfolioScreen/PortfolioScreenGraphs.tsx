import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';
import PieChart from '../../components/PieChart';
import { LineChart } from 'react-native-chart-kit';

// Type definitions
interface WealthGrowthDataPoint {
  week: string;
  value: number;
}

interface AllocationDataItem {
  id: string;
  label: string;
  percentage: number;
  value: number;
  color: string;
  explanation: string;
}

interface Props {
  wealthGrowthData: WealthGrowthDataPoint[];
  allocationData: AllocationDataItem[];
  selectedTimeframe: 'weekly' | 'monthly';
  selectedSlice: string | null;
  setSelectedTimeframe: (timeframe: 'weekly' | 'monthly') => void;
  setSelectedSlice: (slice: string | null) => void;
}

export default function PortfolioScreenGraphs({
  wealthGrowthData,
  allocationData,
  selectedTimeframe,
  selectedSlice,
  setSelectedTimeframe,
  setSelectedSlice
}: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
    <View style={[styles.graphsSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      {/* Wealth Growth Graph */}
      <View style={styles.graphCard}>
        <View style={styles.graphHeader}>
          <Text style={[styles.graphTitle, { fontSize: isTablet ? 24 : 20 }]}>
            Wealth Growth
          </Text>
          <View style={styles.timeframeSelector}>
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                selectedTimeframe === 'weekly' && styles.timeframeButtonActive
              ]}
              onPress={() => setSelectedTimeframe('weekly')}
            >
              <Text style={[
                styles.timeframeButtonText,
                selectedTimeframe === 'weekly' && styles.timeframeButtonTextActive
              ]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                selectedTimeframe === 'monthly' && styles.timeframeButtonActive
              ]}
              onPress={() => setSelectedTimeframe('monthly')}
            >
              <Text style={[
                styles.timeframeButtonText,
                selectedTimeframe === 'monthly' && styles.timeframeButtonTextActive
              ]}>
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Professional Line Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: wealthGrowthData.map((_, index) => `W${index + 1}`),
              datasets: [{
                data: wealthGrowthData.map(point => point.value),
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue color
                strokeWidth: 3
              }]
            }}
            width={screenWidth - (isTablet ? 80 : 40) - 40} // Screen width minus padding
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 8
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#007AFF'
              },
              formatYLabel: (value) => `$${(parseInt(value) / 1000).toFixed(0)}K`,
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withInnerLines={true}
            withOuterLines={false}
            withHorizontalLines={true}
            withVerticalLines={false}
          />
        </View>
      </View>

      {/* Investment Allocation Pie Chart */}
      <View style={styles.graphCard}>
        <Text style={[styles.graphTitle, { fontSize: isTablet ? 24 : 20 }]}>
          Investment Allocation
        </Text>
        
        <View style={styles.pieChartContainer}>
          {/* Proper Pie Chart */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <PieChart
              data={allocationData}
              size={isTablet ? 250 : 200}
              selectedSlice={selectedSlice}
              onSlicePress={setSelectedSlice}
            />
          </View>

          {/* Allocation Legend */}
          <View style={styles.allocationLegend}>
            {allocationData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.legendItem}
                onPress={() => setSelectedSlice(selectedSlice === item.id ? null : item.id)}
              >
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <View style={styles.legendText}>
                  <Text style={styles.legendLabel}>{item.label}</Text>
                  <Text style={styles.legendValue}>
                    {Math.abs(item.percentage)}% (${Math.abs(item.value).toLocaleString()})
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Slice Explanation */}
        {selectedSlice && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {allocationData.find(item => item.id === selectedSlice)?.label}
            </Text>
            <Text style={styles.explanationText}>
              {allocationData.find(item => item.id === selectedSlice)?.explanation}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
