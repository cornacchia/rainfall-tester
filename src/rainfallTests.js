const tests = {
  T1_1: {
    input: [1, 3, 1, 2, 15, 42, 60, 5, 9, 99999],
    output: '15.33'
  },
  T1_2: {
    input: [42, 99999],
    output: '42.00'
  },
  T1_3: {
    input: [0, 99999],
    output: '0.00'
  },
  T1_4: {
    input: [1, 3, 1, 0, 15, 0, 0, 5, 9, 99999],
    output: '5.67'
  },
  T1_5: {
    input: [1, 42, 1, 3, 15, 0, 0, 5, 9, 99999],
    output: '10.86'
  },
  T1_6: {
    input: [42, 15, 18, 17, 999999, 3, 1000, 73, 82, 62, 99999],
    output: '100131.10'
  },
  T2_1: {
    input: [42, 15, 18, 17, 99999, 3, 1000, 73, 82, 62],
    output: '23.00',
  },
  T2_2: {
    input: [1312, 99999, 18, 17, 999999, 3, 1000, 73, 82, 62, 52],
    output: '1312.00'
  },
  T3_1: {
    input: [42, 23, 67, 17, 99999, -3, -1000, -73, -82, -62],
    output: '37.25'
  },
  T3_2: {
    input: [1, 99999, -67, -17, -99999, -3, -1000, -73, -82, -62],
    output: '1.00'
  },
  T4_1: {
    input: [15, -10, 21, 4, 99999],
    output: '13.33'
  },
  T4_2: {
    input: [-15, -10, 21, -4, 99999],
    output: '21.00'
  },
  T5_1: {
    input: [-15, 10, 21, -4, 99999, 53, 23, 12, 92, 10],
    output: '15.50'
  },
  T5_2: {
    input: [-15, 10, 21, -4, 92, 53, -23, 12, 99999, 10],
    output: '37.60'
  },
  T6_1: {
    input: [-15, -10, -21, -4, -92, -53, -23, -12, -10, 99999],
    output: '0.00'
  },
  T6_2: {
    input: [-15, 99999],
    output: '0.00'
  },
  T7_1: {
    input: [-15, 99999, 21, 5, 92, 53, 23, 12, 10, 14],
    output: '0.00'
  },
  T7_2: {
    input: [-15, -21, -5, -92, 99999, -53, -23, 12, 10, 14],
    output: '0.00'
  },
  T8_1: {
    input: [99999],
    output: '0.00'
  },
  T8_2: {
    input: [99999, 15, 15, 20, 1],
    output: '0.00'
  },
  T8_3: {
    input: [99999, 15, -15, 20, -1],
    output: '0.00'
  },
  T9_1: {
    input: [5, 2, 99999, 5, 8, 99999],
    output: '3.50'
  },
  T9_2: {
    input: [5, -2, 5, 99999, 8, 99999],
    output: '5.00'
  },
  T10_1: {
    input: [0, 0, 0, 0, 0, 99999],
    output: '0.00'
  }
}

module.exports = tests