$(function() {
  $('.js-exam-testSolution').click(function () {
    var extractFunctionName = new RegExp(/function\s(\w+)\(/g);
    var functionName = extractFunctionName.exec(editor.getValue())[1];

    // confirm if function to test is functionName

    // append script soltuin
    var solutionScript = document.createElement('script');
    solutionScript.text = editor.getValue();
    document.body.appendChild(solutionScript);

    // test
    testSolution(functionName, [[1, 2, [3, [10]]], 4], [1, 2, 3, 10, 4]);
    testSolution(functionName, [[1, 2, [3], [5], 6], 4], [1, 2, 3, 5, 6, 4]);
    testSolution(functionName, [], []);
  });
});

function testSolution(solution, input, expected) {
  var output = window[solution](input);
  if (compareArrays(output, expected)) {
    console.log('Test passed - Expected value is correct:', expected);
  } else {
    console.log('Test failed - Expected was', expected,' but the output was', output,' for the input', input);
  }
}

function compareArrays(array1, array2) {
  if (array1 && array2 && array1.length !== undefined && array2.length !== undefined) {
    return (array1.length == array2.length && array1.every(function(u, i) {
    return u === array2[i]; }));  
  } else {
    return false;
  }
}
