function encode(){
    var characters = document.getElementById("characters").value;
    var probabilities = document.getElementById("probabilities").value;
    if(characters == "" || probabilities == ""){
        document.getElementById("result").innerHTML="Invalid Input";
        return 0;
    }
    var characterArray = characters.split(',');
    const fixedCharacterArray = characters.split(',');
    var probabilityArray = probabilities.split(',');
    const fixedProbabilityArray = probabilities.split(',');
    if(characterArray.length != probabilityArray.length){
        document.getElementById("result").innerHTML="Invalid Input (Size differs)";
        return 0;
    }
    var totalProbability = 0;
    for(var i=0; i<probabilityArray.length; i++){
        totalProbability += probabilityArray[i]*1;
    }
    if(round(totalProbability,5)!=1){
        document.getElementById("result").innerHTML="Invalid Input (Sum of probabilities is not 1)";
        return 0;
    }
    var result = "<tr><th colspan=\"3\">Tunstall Code</th></tr><tr><th>Character</th><th>Probability</th><th>Code</th></tr>";
    const bitLen = fixedCharacterArray.length;

    while(characterArray.length + bitLen - 1 < Math.pow(2,bitLen)){
        var index = indexOfMax(probabilityArray);
        for(var i=0; i<bitLen; i++){
            probabilityArray.push(probabilityArray[index]*fixedProbabilityArray[i]);
            characterArray.push(characterArray[index]+fixedCharacterArray[i]);
        }
        characterArray.splice(index,1);
        probabilityArray.splice(index,1);
    }
    for(var i=0; i<characterArray.length; i++){
        result += "<tr><td>"
        result += characterArray[i];
        result += "</td><td>"
        result += round(probabilityArray[i],5);
        result += "</td><td>"
        result += printBinary(i,bitLen);
        result += "</td></tr>"
    }

    document.getElementById("result").innerHTML = result;
}

function clearSpace(){
    document.getElementById("characters").value = "";
    document.getElementById("probabilities").value = "";
    document.getElementById("result").innerHTML = "Enter the Characters and their<br>probabilities as comma seperated";
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function printBinary(n, bit)
{
    var arr = new Array(bit)
    var temp = bit-1;
    for(var i=0; i<bit; i++)
        arr[i]=0;
    while(n>0){
        if(n%2<1)
            arr[temp]=0;
        else
            arr[temp]=1;
        n=n/2;
        temp--;
    }
    var result = "";
    for(var i=0; i<bit; i++){
        result += arr[i];
    }
    return result;
}

function intialSetup(){
    document.getElementById("result").innerHTML="Enter the Characters and their<br>probabilities as comma seperated"
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}