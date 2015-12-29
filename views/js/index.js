$(function() {
  $('.js-exam-testSolution').click(function () {
    var functionName = getFunctionName();
    compileSolution(functionName);
    var testsResults = runTests(functionName);
    showOutput(testsResults);
  });

  $('.js-exam-runSolution').click(function () {
    var logInterceptor = new LogInterceptor();
    logInterceptor.start();
    compileSolution();
    logInterceptor.restore();
    showOutput(logInterceptor.getInterceptedValue());
  });

  $('.js-exam-submitSolution').click(function () {
    var confirmed = confirm('Are you sure you want to submit your solution?');
    if (confirmed) {
      var email = $('#email').val();
      var solution = editor.getValue();
      submitSolution(email, solution);
    }
  });

  function getFunctionName() {
    var extractFunctionName = new RegExp(/function\s(\w+)\(/g);
    var functionName = extractFunctionName.exec(editor.getValue())[1];
    // TODO confirm if function to test is functionName
    return functionName;
  }

  function compileSolution(functionName) {
    functionName = functionName || getFunctionName();
    var solutionScript = document.createElement('script');
    solutionScript.text = editor.getValue();
    document.body.appendChild(solutionScript);
  }

  function LogInterceptor() {
    this.start = function () {
      this.interceptedValue = [];
      this.oldLog = console.log;
      console.log = function (text) {
        this.interceptedValue.push(text);
      }.bind(this);
    };
    this.getInterceptedValue = function () {
      return this.interceptedValue;
    };
    this.restore = function () {
      console.log = this.oldLog;
    };
  }

  function showOutput(output) {
    $('.js-exam-solutionOutput').html(output.join('</br>'));
  }
});

function runTests(functionName) {
  var testsResults = [];
  testsResults.push(testSolution(functionName, [[1, 2, [3, [10]]], 4], [1, 2, 3, 10, 4]));
  testsResults.push(testSolution(functionName, [[1, 2, [3], [5], 6], 4], [1, 2, 3, 5, 6, 4]));
  testsResults.push(testSolution(functionName, [], []));

  return testsResults;
}

function testSolution(solution, input, expected) {
  var output = window[solution](input);
  if (compareArrays(output, expected)) {
    return '<span class="green">Test passed</span> - Expected value is correct: <span class="fw-bold">' + toString(expected) + '</span> for the input ' + toString(input);
  } else {
    return '<span class="red">Test failed</span> - Expected was <span class="fw-bold">' + toString(expected) + '</span> but the returned output was <span class="fw-bold">' + toString(output) + '</span> for the input ' + toString(input);
  }

  function toString(value) {
    if (value === undefined || value === null) {
      return value;
    } else if (value.length > 0) {
      return value.toString();
    } else {
      return '[]';
    }
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

function submitSolution(email, solution) {
  $.ajax({
    url: "/submit",
    type: "POST",
    data: JSON.stringify({email: email, solution: solution}),
    contentType: "application/json"
  })
  .done(function( data ) {
    alert(data);
  });
}
