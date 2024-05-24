import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
    leftDiff: 0,
};

const width = 50;
const pointerWidth = width * 0.47;

function LabelBase(props) {
    const { position, value, leftDiff, pressed } = props;
    const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
    const cachedPressed = React.useRef(pressed);

    React.useEffect(() => {
        Animated.timing(scaleValue.current, {
            toValue: pressed ? 1 : 0.1,
            duration: 200,
            delay: pressed ? 0 : 2000,
            useNativeDriver: false,
        }).start();
        cachedPressed.current = pressed;
    }, [pressed]);

    return (
        Number.isFinite(position) &&
        Number.isFinite(value) && (
            <AnimatedView
                style={[
                    styles.sliderLabel,
                    {
                        left: position - width / 2,
                        transform: [
                            { translateY: width },
                            { scale: scaleValue.current },
                            { translateY: -width },
                        ],
                    },
                ]}
            >
                <View style={styles.pointer} />
                <Text style={styles.sliderLabelText}>${value}</Text>
            </AnimatedView>
        )
    );
}

export default function CustomLabel(props) {
    const {
        leftDiff,
        oneMarkerValue,
        twoMarkerValue,
        oneMarkerLeftPosition,
        twoMarkerLeftPosition,
    } = props;

    return (
        <View style={styles.parentView}>
            <LabelBase
                position={oneMarkerLeftPosition}
                value={oneMarkerValue}
                leftDiff={leftDiff}
                pressed={true}
            />
            <LabelBase
                position={twoMarkerLeftPosition}
                value={twoMarkerValue}
                leftDiff={leftDiff}
                pressed={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    parentView: {
        position: 'relative',
    },
    sliderLabel: {
        position: 'absolute',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 5
        // bottom: '100%',
        // width: width,
        // height: width,
    },
    sliderLabelText: {
        fontFamily: 'Inter-Bold',
        fontSize: 11,
        color: '#787B7B',
    },
    pointer: {
        // position: 'absolute',
        // bottom: pointerWidth,
        // left: (width - pointerWidth),
        // transform: [{ rotate: '45deg' }],
        // width: pointerWidth,
        // height: pointerWidth,
        // backgroundColor: '#999',
    },
});