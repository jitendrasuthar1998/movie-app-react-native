import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

const SeasonCard = () => {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        flexDirection: 'row',
      }}
    >
      <View style={{ width: 120, height: 80, backgroundColor: '#D9D9D9' }} />
      <View style={{ width: 180, height: 80 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              //   color: '#F3F3F3',
              fontSize: 16,
            }}
          >
            Episode 1
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              //   color: '#969696',
              fontSize: 13,
            }}
          >
            47m
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            // color: '#F3F3F3',
            fontSize: 12,
            lineHeight: 20,
          }}
        >
          Tormented by her high school classmates and with nowhere...
        </Text>
      </View>
    </View>
  );
};

export default SeasonCard;

const styles = StyleSheet.create({});
