$(function() {
  $('.js-exam-testSolution').click(function () {
    clearOutput();
    var functionName = getFunctionName();

    var logInterceptor = new LogInterceptor();
    var errorInterceptor = new ErrorInterceptor();
    logInterceptor.start();
    errorInterceptor.start();

    compileSolution(functionName);
    try {
      var testsResults = runTests(functionName);
    } catch (err) {
      /* this will be caught by errorInterceptor */
    }

    logInterceptor.restore();
    errorInterceptor.restore();
    showOutput(errorInterceptor.getInterceptedValue());
    showOutput(logInterceptor.getInterceptedValue());
    showOutput(testsResults);
  });

  $('.js-exam-runSolution').click(function () {
    clearOutput();

    var logInterceptor = new LogInterceptor();
    var errorInterceptor = new ErrorInterceptor();
    logInterceptor.start();
    errorInterceptor.start();

    compileSolution();

    logInterceptor.restore();
    errorInterceptor.restore();
    showOutput(errorInterceptor.getInterceptedValue());
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

  function ErrorInterceptor() {
    this.start = function () {
      this.interceptedValue = [];
      window.onerror = function(error) {
        this.interceptedValue.push(error);
      }.bind(this);
    };
    this.getInterceptedValue = function () {
      return this.interceptedValue;
    };
    this.restore = function () {
      window.onerror = null;
    };
  }
    
  function LogInterceptor() {
    this.start = function () {
      this.interceptedValue = [];
      this.oldLog = console.log;
      console.log = function (text) {
        if (text) {
          this.interceptedValue.push(JSON.stringify(text));
        } else {
          this.interceptedValue.push(text);
        }
      }.bind(this);
    };
    this.getInterceptedValue = function () {
      return this.interceptedValue;
    };
    this.restore = function () {
      console.log = this.oldLog;
    };
  }

  function clearOutput() {
    $('.js-exam-solutionOutput').html('');
  }

  function showOutput(output) {
    if (output) {
      if (output.join) {
        $('.js-exam-solutionOutput').append(output.join('</br>'));
      } else {
        $('.js-exam-solutionOutput').append(output);
      }
      $('.js-exam-solutionOutput').append('</br>');
    }
  }
});

function runTests(functionName) {
  var testsResults = [];
  testsResults.push(">> Testing your first declared function: " + functionName);
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
      return JSON.stringify(value);
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
