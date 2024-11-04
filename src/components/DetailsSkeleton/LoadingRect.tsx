import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle, StyleProp } from 'react-native';

type DimensionType = number | `${number}%` | 'auto';

interface LoadingRectProps {
  width: DimensionType;
  height: DimensionType;
  backgroundColor: string;
  style?: StyleProp<ViewStyle>;
}

const LoadingRect: React.FC<LoadingRectProps> = (props) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };

    const animationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ])
    );

    animationLoop.start();

    return () => {
      animationLoop.stop();
      pulseAnim.stopAnimation();
    };
  }, [pulseAnim]);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={[
        {
          width: props.width,
          height: props.height,
          backgroundColor: props.backgroundColor,
        },
        { opacity: opacityAnim },
        props.style,
      ]}
    />
  );
};

export default LoadingRect;
