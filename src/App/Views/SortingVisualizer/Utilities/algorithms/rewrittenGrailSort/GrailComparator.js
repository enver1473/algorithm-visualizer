class GrailComparator {
  compare(leftPair, rightPair) {
    if      (leftPair.getValue() < rightPair.getValue()) return -1;
    else if (leftPair.getValue() > rightPair.getValue()) return  1;
    else                                             return  0;
  }
}

export default GrailComparator;
