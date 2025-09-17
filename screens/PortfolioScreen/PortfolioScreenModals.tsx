import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';

// Type definitions
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  reward: string;
}

interface MarketEvent {
  type: string;
  title: string;
  description: string;
  impact: string;
  color: string;
  icon: string;
  decision: string;
}

interface PortfolioAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  subtitle: string;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface User {
  cash: number;
}

interface Props {
  // Modal visibility states
  showActionSheet: boolean;
  showAchievements: boolean;
  showMarketEvent: boolean;
  showStockModal: boolean;
  
  // Modal state setters
  setShowActionSheet: (show: boolean) => void;
  setShowAchievements: (show: boolean) => void;
  setShowMarketEvent: (show: boolean) => void;
  setShowStockModal: (show: boolean) => void;
  
  // Data
  achievements: Achievement[];
  currentEvent: MarketEvent;
  portfolioActions: PortfolioAction[];
  fakeStocks: Stock[];
  user: User | null;
  
  // Stock trading states
  selectedStock: Stock | null;
  tradeType: 'buy' | 'sell';
  tradeAmount: string;
  setTradeType: (type: 'buy' | 'sell') => void;
  setTradeAmount: (amount: string) => void;
  
  // Handlers
  handleStockSelect: (stock: Stock) => void;
  handleTrade: () => void;
}

export default function PortfolioScreenModals({
  showActionSheet,
  showAchievements,
  showMarketEvent,
  showStockModal,
  setShowActionSheet,
  setShowAchievements,
  setShowMarketEvent,
  setShowStockModal,
  achievements,
  currentEvent,
  portfolioActions,
  fakeStocks,
  user,
  selectedStock,
  tradeType,
  tradeAmount,
  setTradeType,
  setTradeAmount,
  handleStockSelect,
  handleTrade
}: Props): React.JSX.Element {
  return (
    <>
      {/* Action Sheet Modal */}
      {showActionSheet && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowActionSheet(false)}
        >
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity 
              style={styles.actionSheetHeader}
              activeOpacity={1}
            >
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Portfolio Actions</Text>
              <Text style={styles.actionSheetSubtitle}>
                Choose how to manage your money
              </Text>
            </TouchableOpacity>

            <View style={styles.actionsGrid}>
              {portfolioActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => {
                    setShowActionSheet(false);
                    // TODO: Navigate to specific action screen
                    console.log(`Selected action: ${action.title}`);
                  }}
                >
                  <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                    <Ionicons name={action.icon as any} size={24} color="#fff" />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowActionSheet(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowAchievements(false)}
        >
          <View style={styles.achievementsModal}>
            <TouchableOpacity 
              style={styles.actionSheetHeader}
              activeOpacity={1}
            >
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Achievements</Text>
              <Text style={styles.actionSheetSubtitle}>
                Your financial milestones
              </Text>
            </TouchableOpacity>

            <ScrollView style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.achievementCardLocked
                  ]}
                >
                  <View style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.unlocked ? achievement.color : '#d1d5db' }
                  ]}>
                    <Ionicons 
                      name={achievement.icon as any} 
                      size={24} 
                      color="#fff" 
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <View style={styles.achievementHeader}>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.unlocked && styles.achievementTitleLocked
                      ]}>
                        {achievement.title}
                      </Text>
                      {achievement.unlocked && (
                        <Text style={styles.achievementReward}>
                          {achievement.reward}
                        </Text>
                      )}
                    </View>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.achievementDescriptionLocked
                    ]}>
                      {achievement.description}
                    </Text>
                    {!achievement.unlocked && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill,
                              { width: `${achievement.progress}%` }
                            ]} 
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {achievement.progress}%
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}

      {/* Market Event Modal */}
      {showMarketEvent && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowMarketEvent(false)}
        >
          <View style={styles.marketEventModal}>
            <View style={styles.marketEventModalHeader}>
              <Ionicons 
                name={currentEvent.icon as any} 
                size={32} 
                color={currentEvent.color} 
              />
              <Text style={[styles.marketEventModalTitle, { color: currentEvent.color }]}>
                {currentEvent.title}
              </Text>
              <Text style={styles.marketEventModalImpact}>
                {currentEvent.impact}
              </Text>
            </View>
            
            <Text style={styles.marketEventModalDescription}>
              {currentEvent.description}
            </Text>
            
            <Text style={styles.marketEventDecision}>
              {currentEvent.decision}
            </Text>
            
            <View style={styles.marketEventActions}>
              <TouchableOpacity style={[styles.marketEventButton, styles.sellButton]}>
                <Text style={styles.marketEventButtonText}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.marketEventButton, styles.holdButton]}>
                <Text style={styles.marketEventButtonText}>Hold</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.marketEventButton, styles.buyButton]}>
                <Text style={styles.marketEventButtonText}>Buy More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Stock Trading Modal */}
      <Modal
        visible={showStockModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStockModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Stock Trading</Text>
              <TouchableOpacity onPress={() => setShowStockModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.tradingToggle}>
              <TouchableOpacity
                style={[styles.toggleButton, tradeType === 'buy' && styles.toggleButtonActive]}
                onPress={() => setTradeType('buy')}
              >
                <Text style={[styles.toggleText, tradeType === 'buy' && styles.toggleTextActive]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, tradeType === 'sell' && styles.toggleButtonActive]}
                onPress={() => setTradeType('sell')}
              >
                <Text style={[styles.toggleText, tradeType === 'sell' && styles.toggleTextActive]}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.cashBalance}>Cash: ${user?.cash.toLocaleString()}</Text>

            <ScrollView style={styles.stocksList}>
              {fakeStocks.map((stock) => (
                <TouchableOpacity
                  key={stock.symbol}
                  style={[
                    styles.stockItem,
                    selectedStock?.symbol === stock.symbol && styles.stockItemSelected
                  ]}
                  onPress={() => handleStockSelect(stock)}
                >
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockName}>{stock.name}</Text>
                  </View>
                  <View style={styles.stockPriceContainer}>
                    <Text style={styles.stockPrice}>${stock.price}</Text>
                    <Text style={[
                      styles.stockChange,
                      { color: stock.change >= 0 ? '#34C759' : '#FF3B30' }
                    ]}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedStock && (
              <View style={styles.tradeForm}>
                <Text style={styles.selectedStockText}>
                  {tradeType === 'buy' ? 'Buying' : 'Selling'} {selectedStock.symbol}
                </Text>
                <Text style={styles.stockPriceText}>
                  Price: ${selectedStock.price}
                </Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Shares:</Text>
                  <TextInput
                    style={styles.shareInput}
                    value={tradeAmount}
                    onChangeText={setTradeAmount}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>

                <Text style={styles.totalCost}>
                  Total: ${(parseFloat(tradeAmount) * selectedStock.price || 0).toLocaleString()}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.tradeButton,
                    { backgroundColor: tradeType === 'buy' ? '#34C759' : '#FF3B30' }
                  ]}
                  onPress={handleTrade}
                >
                  <Text style={styles.tradeButtonText}>
                    {tradeType === 'buy' ? 'Buy' : 'Sell'} Shares
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
