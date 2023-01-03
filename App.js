/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import {IconButton, Surface} from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import VideoPlayer from 'react-native-video-controls';

import {VESDK, Configuration} from 'react-native-videoeditorsdk';
import initialVideo from './assets/Skater.mp4';

/**
 * Uncomment the following single line of code to unlock VideoEditor SDK automatically
 * for both platforms. Every platform requires a separate license file which must be
 * named `vesdk_license.ios.json` for the iOS license and `vesdk_license.android.json`
 * for the Android license file.
 */
// VESDK.unlockWithLicense(require('./vesdk_license'));

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const videoUri = Image.resolveAssetSource(initialVideo).uri;
  const [video, setVideo] = useState(videoUri);
  console.log(videoUri);
  const openEditor = () => {
    // Set up sample video
    // Set up configuration
    let configuration: Configuration = {
      // Configure sticker tool
      sticker: {
        // Enable personal stickers
        personalStickers: true,
        // Configure sticker library
        categories: [
          // Create sticker category with stickers
          {
            identifier: 'example_sticker_category_logos',
            name: 'Logos',
            thumbnailURI: require('./assets/React.png'),
            items: [
              {
                identifier: 'example_sticker_logos_react',
                name: 'React',
                stickerURI: require('./assets/React.png'),
              },
              {
                identifier: 'example_sticker_logos_imgly',
                name: 'IMG.LY',
                stickerURI: require('./assets/Igor.png'),
              },
            ],
          },
          // Reorder and use existing sticker categories
          {identifier: 'imgly_sticker_category_animated'},
          {identifier: 'imgly_sticker_category_emoticons'},
          // Modify existing sticker category
          {
            identifier: 'imgly_sticker_category_shapes',
            items: [
              {identifier: 'imgly_sticker_shapes_badge_01'},
              {identifier: 'imgly_sticker_shapes_arrow_02'},
              {identifier: 'imgly_sticker_shapes_spray_03'},
            ],
          },
        ],
      },
      // Configure video composition tool
      composition: {
        // Enable personal video clips
        personalVideoClips: true,
        // Configure video clip library
        categories: [
          // Create video clip category with video clips
          {
            identifier: "example_video_category_custom",
            name: "Custom",
            items: [
              {
                identifier: "example_video_custom_dj",
                videoURI: require('./assets/DJ.mp4')
              },
              {
                identifier: "example_video_custom_notes",
                videoURI: require('./assets/Notes.mp4')
              },
            ]
          }
        ]
      },
      // Configure audio tool
      audio: {
        // Configure audio clip library
        categories: [
          // Create audio clip category with audio clips
          {
            identifier: "example_audio_category_custom",
            name: "Custom",
            items: [
              {
                // Use metadata to display title and artist
                identifier: "example_audio_custom_elsewhere",
                audioURI: require('./assets/Elsewhere.mp3')
              },
              {
                // Override metadata to display title and artist
                identifier: "example_audio_custom_danceharder",
                title: "Dance Harder",
                artist: "Three Chain Links",
                audioURI: require('./assets/DanceHarder.mp3')
              },
              {
                identifier: "a_mi_madre",
                title: "A Mi Madre",
                audioURI: "redacted",
                artist: "Caro Luna",
                duration: 272
              },{
                identifier: "belong_to_you_normalized",
                title: "Belong To You (normalized)",
                audioURI: "redacted",
                artist: "Ealot",
                duration: 194
              }
            ]
          }
        ]
      }
    };
    VESDK.openEditor(video, configuration).then(
      (result) => {
        setVideo(result.video);
        console.log(result);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const themedStyles = {
    iconClose: [
      styles.closeButton,
      {
        borderColor: 'red',
        backgroundColor: 'white',
      },
      styles.closeVideoPosition,
    ],
    editButton: {
      borderColor: 'white',
      backgroundColor: 'white',
      top: 0,
      left: 0,
    },
    magicText: [styles.magicText, {color: 'gray'}],
    magicIcon: {top: -5, left: -5},
    videoContainer: {
      width: '100%',
      minHeight: 500,
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: 500,
    },
  };

  const videoPlayer = (
    <VideoPlayer
      source={{uri: video}}
      resizeMode="contain"
      style={[themedStyles.video]}
      disableBack
      repeat
    />
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="VideoEditor SDK">
            <TouchableHighlight onPress={openEditor}>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: isDarkMode ? Colors.white : Colors.black,
                  },
                ]}>
                Click here to{' '}
                <Text style={styles.highlight}>edit a sample video</Text>.
              </Text>
            </TouchableHighlight>
          </Section>
          <View>
            <Surface style={styles.videoParent}>
              <View style={themedStyles.videoContainer}>{videoPlayer}</View>
            </Surface>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
