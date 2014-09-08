function Calc($scope) {

	$scope.initialize = function() {
		$scope.output = 0;
        $scope.newNumber = true;
        $scope.pendingOperation = null;
        $scope.RunningTotal = null;
        $scope.pendingValue = null;
        $scope.lastOperation = null;
	}
    $scope.initialize();

    $scope.updateOutput = function(value) {
	  	 if($scope.output == 0 || $scope.newNumber ) {
	  	 		$scope.output = value;
	  	 		$scope.newNumber = false;
	  	 } else {
	  	 	 	$scope.output += String(value);
	  	 }
	  	 $scope.pendingValue = $scope.output*1;
    }

    $scope.add = function () {
        $scope.performOperation();
      	$scope.pendingOperation = '+';
      	
    }

    $scope.subtract = function () {
      $scope.performOperation();
      $scope.pendingOperation = '-';
      
    }

    $scope.multiply = function() {
      $scope.performOperation();
      $scope.pendingOperation = '*';
    }

    $scope.calculate = function() {
        $scope.performOperation();  
    }

    $scope.devide = function() {
    	$scope.performOperation();
    	$scope.pendingOperation = '/';
    
    }

    $scope.clear = function() {
    	 $scope.initialize();
    }

    $scope.performOperation = function() {

    	if($scope.pendingValue) {
	    	switch($scope.pendingOperation) {
	        case '+':
	            $scope.runningTotal += $scope.pendingValue;
	            break;
	        case '-': 
	            $scope.runningTotal -= $scope.pendingValue;
	            break; 
	        case '*':
	            $scope.runningTotal *= $scope.pendingValue;
	            break;  
	        case '/':
	            $scope.runningTotal /= $scope.pendingValue;
	            break;     
	        default:
	            $scope.runningTotal = $scope.pendingValue;    
	        
	      }
    	}

      $scope.output = String($scope.runningTotal);
      $scope.newNumber = true;
      $scope.pendingValue = null;
 
  	}

}