export class PortfolioData {
    // Overall portfolio metrics
    totalValue: number;
    totalDailyChangePercent: number;
    totalDailyChangeAmount: number;
    totalWeeklyChangePercent: number;
    totalWeeklyChangeAmount: number;
    totalChangeIsPositive: boolean;
    chartData: number[];

    // Individual asset classes
    individualStocksValue: number;
    individualStocksDailyChangePercent: number;
    individualStocksDailyChangeAmount: number;
    individualStocksTotalChangeIsPositive: boolean;

    etfsValue: number;
    etfsDailyChangePercent: number;
    etfsDailyChangeAmount: number;
    etfsTotalChangeIsPositive: boolean;

    realEstateValue: number;
    realEstateDailyChangePercent: number;
    realEstateDailyChangeAmount: number;
    realEstateTotalChangeIsPositive: boolean;

    bondsValue: number;
    bondsDailyChangePercent: number;
    bondsDailyChangeAmount: number;
    bondsTotalChangeIsPositive: boolean;

    cryptoValue: number;
    cryptoDailyChangePercent: number;
    cryptoDailyChangeAmount: number;
    cryptoTotalChangeIsPositive: boolean;

    constructor(
        stocks: number = 0,
        etfs: number = 0,
        realEstate: number = 0,
        bonds: number = 0,
        crypto: number = 0,
        stocksChange: number = 3.2,
        etfsChange: number = 1.8,
        realEstateChange: number = 1.2,
        bondsChange: number = 0.5,
        cryptoChange: number = -4.5,
        weeklyChange: number = -1.2,
        chartData: number[] = [12500, 13200, 13800, 14100, 14700, 15200, 15400, 15750]
    ) {
        // Set individual asset values
        this.individualStocksValue = stocks;
        this.etfsValue = etfs;
        this.realEstateValue = realEstate;
        this.bondsValue = bonds;
        this.cryptoValue = crypto;

        // Calculate total value
        this.totalValue = stocks + etfs + realEstate + bonds + crypto;

        // Set individual asset changes
        this.individualStocksDailyChangePercent = stocksChange;
        this.etfsDailyChangePercent = etfsChange;
        this.realEstateDailyChangePercent = realEstateChange;
        this.bondsDailyChangePercent = bondsChange;
        this.cryptoDailyChangePercent = cryptoChange;

        // Calculate individual asset change amounts
        this.individualStocksDailyChangeAmount = this.calculateChangeAmount(stocks, stocksChange);
        this.etfsDailyChangeAmount = this.calculateChangeAmount(etfs, etfsChange);
        this.realEstateDailyChangeAmount = this.calculateChangeAmount(realEstate, realEstateChange);
        this.bondsDailyChangeAmount = this.calculateChangeAmount(bonds, bondsChange);
        this.cryptoDailyChangeAmount = this.calculateChangeAmount(crypto, cryptoChange);

        // Set individual asset change directions
        this.individualStocksTotalChangeIsPositive = stocksChange >= 0;
        this.etfsTotalChangeIsPositive = etfsChange >= 0;
        this.realEstateTotalChangeIsPositive = realEstateChange >= 0;
        this.bondsTotalChangeIsPositive = bondsChange >= 0;
        this.cryptoTotalChangeIsPositive = cryptoChange >= 0;

        // Calculate total daily change
        this.totalDailyChangeAmount = this.individualStocksDailyChangeAmount + 
                                     this.etfsDailyChangeAmount + 
                                     this.realEstateDailyChangeAmount + 
                                     this.bondsDailyChangeAmount + 
                                     this.cryptoDailyChangeAmount;

        this.totalDailyChangePercent = this.totalValue > 0 
            ? (this.totalDailyChangeAmount / this.totalValue) * 100 
            : 0;
        this.totalChangeIsPositive = this.totalDailyChangePercent >= 0;

        // Set weekly change
        this.totalWeeklyChangePercent = weeklyChange;
        this.totalWeeklyChangeAmount = this.calculateChangeAmount(this.totalValue, weeklyChange);

        // Set chart data
        this.chartData = chartData;
    }

    // Helper method to calculate change amount from percentage
    private calculateChangeAmount(value: number, changePercent: number): number {
        return (value * changePercent) / 100;
    }

    // Method to get total assets breakdown
    getAssetsBreakdown() {
        return {
            stocks: this.individualStocksValue,
            etfs: this.etfsValue,
            realEstate: this.realEstateValue,
            bonds: this.bondsValue,
            crypto: this.cryptoValue
        };
    }

    // Method to update individual stock value
    updateStocksValue(newValue: number, changePercent?: number) {
        const oldValue = this.individualStocksValue;
        this.individualStocksValue = newValue;
        
        if (changePercent !== undefined) {
            this.individualStocksDailyChangePercent = changePercent;
            this.individualStocksDailyChangeAmount = this.calculateChangeAmount(newValue, changePercent);
            this.individualStocksTotalChangeIsPositive = changePercent >= 0;
        }
        
        this.recalculateTotal();
    }

    // Method to update ETFs value
    updateEtfsValue(newValue: number, changePercent?: number) {
        this.etfsValue = newValue;
        
        if (changePercent !== undefined) {
            this.etfsDailyChangePercent = changePercent;
            this.etfsDailyChangeAmount = this.calculateChangeAmount(newValue, changePercent);
            this.etfsTotalChangeIsPositive = changePercent >= 0;
        }
        
        this.recalculateTotal();
    }

    // Method to update Real Estate value
    updateRealEstateValue(newValue: number, changePercent?: number) {
        this.realEstateValue = newValue;
        
        if (changePercent !== undefined) {
            this.realEstateDailyChangePercent = changePercent;
            this.realEstateDailyChangeAmount = this.calculateChangeAmount(newValue, changePercent);
            this.realEstateTotalChangeIsPositive = changePercent >= 0;
        }
        
        this.recalculateTotal();
    }

    // Method to update Bonds value
    updateBondsValue(newValue: number, changePercent?: number) {
        this.bondsValue = newValue;
        
        if (changePercent !== undefined) {
            this.bondsDailyChangePercent = changePercent;
            this.bondsDailyChangeAmount = this.calculateChangeAmount(newValue, changePercent);
            this.bondsTotalChangeIsPositive = changePercent >= 0;
        }
        
        this.recalculateTotal();
    }

    // Method to update Crypto value
    updateCryptoValue(newValue: number, changePercent?: number) {
        this.cryptoValue = newValue;
        
        if (changePercent !== undefined) {
            this.cryptoDailyChangePercent = changePercent;
            this.cryptoDailyChangeAmount = this.calculateChangeAmount(newValue, changePercent);
            this.cryptoTotalChangeIsPositive = changePercent >= 0;
        }
        
        this.recalculateTotal();
    }

    // Method to recalculate total portfolio values
    private recalculateTotal() {
        this.totalValue = this.individualStocksValue + this.etfsValue + this.realEstateValue + this.bondsValue + this.cryptoValue;
        
        this.totalDailyChangeAmount = this.individualStocksDailyChangeAmount + 
                                     this.etfsDailyChangeAmount + 
                                     this.realEstateDailyChangeAmount + 
                                     this.bondsDailyChangeAmount + 
                                     this.cryptoDailyChangeAmount;
        
        this.totalDailyChangePercent = this.totalValue > 0 
            ? (this.totalDailyChangeAmount / this.totalValue) * 100 
            : 0;
        this.totalChangeIsPositive = this.totalDailyChangePercent >= 0;
    }

    // Method to add to chart data (for tracking historical performance)
    addChartDataPoint(value: number) {
        this.chartData.push(value);
        // Keep only last 8 data points
        if (this.chartData.length > 8) {
            this.chartData.shift();
        }
    }

    // Method to get performance summary
    getPerformanceSummary() {
        return {
            totalValue: this.totalValue,
            dailyChange: {
                percent: this.totalDailyChangePercent,
                amount: this.totalDailyChangeAmount,
                isPositive: this.totalChangeIsPositive
            },
            weeklyChange: {
                percent: this.totalWeeklyChangePercent,
                amount: this.totalWeeklyChangeAmount
            },
            breakdown: this.getAssetsBreakdown()
        };
    }
}