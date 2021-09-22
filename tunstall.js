var characterArray;
var probabilityArray;
var codeArray;
var bitLen;
function encode(){
    var characters = document.getElementById("characters").value;
    var probabilities = document.getElementById("probabilities").value;
    if(characters == "" || probabilities == ""){
        document.getElementById("result").innerHTML="Invalid Input";
        return 0;
    }
    characterArray = characters.split(',');
    const fixedCharacterArray = characters.split(',');
    probabilityArray = probabilities.split(',');
    const fixedProbabilityArray = probabilities.split(',');
    for(var i=0; i<characterArray.length; i++){
        if(characterArray[i]=="" || probabilityArray[i]==""){
            document.getElementById("result").innerHTML="Invalid Input";
            return 0;
        }
    }
    if(characterArray.length != probabilityArray.length){
        document.getElementById("result").innerHTML="Invalid Input (Size differs)";
        return 0;
    }
    if(characterArray.length == 1){
        document.getElementById("result").innerHTML="Invalid Input (Enter more than one value)";
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
    bitLen = fixedCharacterArray.length;

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
    document.getElementById("nextpage").disabled=false;

}

function clearSpace(){
    document.getElementById("characters").value = "";
    document.getElementById("probabilities").value = "";
    document.getElementById("result").innerHTML = "Enter the Characters and their<br>probabilities as comma seperated";
    document.getElementById("nextpage").disabled=true;
}

function messageToCode(){
    var message = document.getElementById("message").value;
    var result = "";
    var temp = "";
    for(var i=0; i<message.length; i++){

        if(characterArray.indexOf(message[i])!=-1)
            result += printBinary(characterArray.indexOf(message[i]),bitLen);
        else{
            temp = message[i];
            while(characterArray.indexOf(temp)==-1){
                temp += message[i+1];
                i++;
                if(i>=message.length){
                    document.getElementById("code").value = "invalid message";
                    return 0;
                }
            }
            result += printBinary(characterArray.indexOf(temp),bitLen);
        }
    }
    document.getElementById("code").value = result;
}

function codeToMessage(){
    var code = document.getElementById("code").value;
    if(code.length%bitLen!=0){
        document.getElementById("message").value="Invalid Code";
        return 0;
    }
    for(var i=0; i<code.length; i++){
        if(code[i]!=0 && code[i]!=1){
            document.getElementById("message").value="Invalid Code";
            return 0;
        }
    }
    var result = "";
    for(var i=0; i<code.length/bitLen; i++){
        result += characterArray[bin2dec(code.substring(i*bitLen,(i*bitLen+bitLen*1)))]
        if(bin2dec(code.substring(i*bitLen,(i*bitLen+bitLen*1)))>=characterArray.length){
            document.getElementById("message").value="Invalid Code";
            return 0;
        }
    }
    document.getElementById("message").value=result;
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

function nextpage(){
    document.getElementById("coding").style.display = "contents";
    document.getElementById("home").style.display = "none";
}

function homepage(){
    document.getElementById("coding").style.display = "none";
    document.getElementById("home").style.display = "contents";
}

function intialSetup(){
    document.getElementById("result").innerHTML="Enter the Characters and their<br>probabilities as comma seperated";
    document.getElementById("nextpage").disabled=true;
    document.getElementById("coding").style.display = "none";
    document.getElementById("home").style.display = "contents";
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function bin2dec(bin){
    return parseInt(bin, 2).toString(10);
}