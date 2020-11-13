import React from 'react';
import { List } from 'antd';
import Version from './Version';

const versions = [
  {
    title: '1.3.0',
    content: [
      'Fixed bug where the user had to change the array size in order to generate an array. Should all now be automatic.',
      'Added tree sort (unbalanced)',
      'Removed buffered room sort (currently in-the-making)',
    ]
  },
  {
    title: '1.2.10',
    content: [
      'Added array state check (checks if array is sorted and if it is sorted stably)',
      'Fixed stability of binary insertion sort',
    ]
  },
  {
    title: '1.2.9.2',
    content: [
      'Fixed stability of recursive rotate merge sort, previously not stable',
    ]
  },
  {
    title: '1.2.9.1',
    content: [
      'Recursive rotate merge sort 100% working',
    ]
  },
  {
    title: '1.2.9',
    content: [
      'Recursive rotate merge sort nearly fixed: one edge case remaining',
    ]
  },
  {
    title: '1.2.8',
    content: [
      'Added new algorithm: buffered rotate room sort',
      'Added new algorithm: advanced room shaker sort',
    ]
  },
  {
    title: '1.2.7',
    content: [
      'Fixed visual bug in grail sort',
      'Added new algorithm: advanced room sort',
      'Added new algorithm: rotate room shaker sort',
    ],
  },
  {
    title: '1.2.6',
    content: [
      'Added radix MSD (base 4) sort',
      'Changed visualization style for radix LSD sorts',
    ],
  },
  {
    title: '1.2.5',
    content: [
      'Added grail sort and optimized rotate room sort',
    ],
  },
  {
    title: '1.2.4',
    content: [
      'Added recursive and iterative pairwise sorting network',
      'Added stooge sort',
      'Added brand new sort: Rotate room sort',
      'Added a volume slider for sound',
    ],
  },
  {
    title: '1.2.3',
    content: ['Responsiveness improved', 'Fixed major lag inducing bug'],
  },
  {
    title: '1.2.2',
    content: ['Fixed bug in binary insertion and optimized room sort'],
  },
  {
    title: '1.2.1',
    content: ['Added binary insertion and optimized room sort'],
  },
  {
    title: '1.2',
    content: ['Sound is here! You can now hear the sound of sorting'],
  },
  {
    title: '1.1.13',
    content: ['Added already sorted input array type'],
  },
  {
    title: '1.1.12',
    content: ['Added room sort', 'Added change log'],
  },
  {
    title: '1.1.11',
    content: [
      'Added min heap sort',
      'Added max heap sort',
      'Added brand new algorithm: min-max heap sort',
    ],
  },
  {
    title: '1.1.10',
    content: ['Added radix LSD for multiple bases', 'Minor changes'],
  },
  {
    title: '1.1.9',
    content: ['Added weave merge sort', 'Code refactor'],
  },
  {
    title: '1.1.8',
    content: ['Added in-place merge sort'],
  },
  {
    title: '1.1.7',
    content: ['Fixed gap in shell sort for small arrays', 'Minor bug fixes and improvements'],
  },
  {
    title: '1.1.6',
    content: ['Added shell sort', 'Minor fix on radix sort in reverse playback'],
  },
  {
    title: '1.1.5',
    content: ['Added radix LSD sort'],
  },
  {
    title: '1.1.4',
    content: ['Added bottom-up merge sort'],
  },
  {
    title: '1.1.3',
    content: ['Added merge sort', 'Fixed insertion sort for some visualization methods'],
  },
  {
    title: '1.1.2',
    content: ['Fixed incorrect color distribution on rainbowCircle for almost sorted input array'],
  },
  {
    title: '1.1.1',
    content: [
      'Fixed incorrect color distribution on rainbow visualization methods',
      'Fixed and updated selection and double selection sort for a more realistic representation of their complexity',
    ],
  },
  {
    title: '1.1',
    content: [
      'Added several visualization methods',
      'Improved interactivity and overall app design',
      'Added functionalities such as "auto-rebuild"',
    ],
  },
  {
    title: '1.0.2',
    content: ['Added several algorithms'],
  },
  {
    title: '1.0.1',
    content: [
      'Added several algorithms',
      'Optimized drawing technique for a more fluid user experience',
    ],
  },
  {
    title: '1.0',
    content: [
      'Numerous algorithms to choose from',
      'Several different visualization methods',
      'Multiple array input types for the curious',
      'Control over several parameters of the visualization flow including live FPS and Step size updating for a seamless experience',
    ],
  },
];

const Versions = () => {
  return (
    <List
      size='large'
      split={false}
      dataSource={versions}
      renderItem={({ title, content }) => (
        <List.Item>{<Version title={title} content={content} />}</List.Item>
      )}
    />
  );
};

export default Versions;
