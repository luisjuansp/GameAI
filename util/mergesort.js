function merge (arrayA, arrayB, compare) {
	var arrayC = [];

	while (arrayA.length!=0 && arrayB.length!=0){
		if(compare(arrayA[0], arrayB[0])){
			arrayC.push(arrayA[0]);
			arrayA.splice(0,1);
		}else{
			arrayC.push(arrayB[0]);
			arrayB.splice(0,1);
		}
	}
	while (arrayA.length!=0){
		arrayC.push(arrayA[0]);
		arrayA.splice(0,1);
	}
	while (arrayB.length!=0){
		arrayC.push(arrayB[0]);
		arrayB.splice(0,1);
	}
	return arrayC;
}

var mergesort = function (array, compare) {
	var length = array.length;

	if (array.length == 1 ) return array;

	var leftside = array.slice(0, length/2);
	var rigthside = array.slice(length/2, length);

	leftside = mergesort(leftside, compare);
	rigthside = mergesort(rigthside, compare);

	return merge( leftside, rigthside, compare)
}

module.exports = mergesort;