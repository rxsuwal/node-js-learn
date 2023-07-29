function createCheckDigit(membershipId) {
  // Write the code that goes here.
  let sum = getSumOfDigits(membershipId)
  if(sum.toString().length > 1){
    sum = createCheckDigit(sum)
    console.log(sum)
    return sum
  }else{
    return sum
  }
  // return getSumOfDigits(membershipId)
}

function getSumOfDigits(number) {
  // Convert the number to a string.
  const numberString = number.toString();

  // Initialize a variable to store the sum of the digits.
  let sum = 0;

  // Iterate over the characters in the number string.
  for (const character of numberString) {
    // Convert the character to a number.
    const digit = parseInt(character, 10);

    // Add the digit to the sum.
    sum += digit;
  }
  return sum
}

console.log(createCheckDigit("99"));