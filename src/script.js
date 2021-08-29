//events, buttons, etc, without optimizing algorithm

class cut{
    constructor(length,amount){
    this.length=length;
    this.amount=amount;
    }
}

addInputInitListeners();
addInputListeners();


function start()
{
    let cutList = getInputList();
    let maxCutLength = $("#input-max-length").val();
    
    if(inputRepeatedLengths(cutList)==true){window.alert("The lengths set for cutting cannot be repeated");return;}
    if(inputExceedsMaxCutLength(cutList,maxCutLength)==true){window.alert("At least one of the cutting lengths exceeds the specified material length");return;}
    if(inputIsZeroOrNull(cutList,maxCutLength)==true){window.alert("Lengths and quantities cannot be equal zero");return;}

    
    cutList = cutList.sort(compareDesc);

    algorithm(cutList,maxCutLength);
    
}

function inputIsZeroOrNull(myCutList,myMaxCutLength)
{
    for(i=0;i<myCutListLength;i++)
    {
        if(myCutList[i].length==0){return true;}
        if(myCutList[i].amount==0){return true;}
    }
    if(myMaxCutLength==0||myMaxCutLength==null){return true;}
    return false;
}

function inputExceedsMaxCutLength(myCutList,myMaxCutLength)
{
    myCutListLength = myCutList.length;
    for(i=0;i<myCutListLength;i++)
    {
        if(myCutList[i].length>myMaxCutLength){return true;}
    }
    return false;
}

function inputRepeatedLengths(myCutList)
{
    
    myCutListLength = myCutList.length;
    //check if there are no repeated lengths
    for(i=0;i<myCutListLength;i++)
    {
        let currentLength = myCutList[i].length;
        for(j=0;j<myCutListLength;j++)
        {
            if(j!=i){
                if(currentLength==myCutList[j].length){return true;}
            }
        }
    }
    return false;
}


function getInputList()
{

    let listLength = $("#inputCutList li").length;	
    let cutLength;
    let cutAmount;

    let cutList = [];	
    cutList.length = 0;

    let j=0;
    for(let i=0;i<listLength;i++){
        
        cutLength = parseInt($('#input-length-'+i).val());
        cutAmount = parseInt($('#input-amount-'+i).val());
        
        if(cutLength>=0&&cutAmount>=0)
        {	
        cutList[j] = new cut(cutLength,cutAmount);
        //console.log('cut: '+j+", length: "+cutList[j].length+", amount: "+cutList[j].amount);
        j++;
        }
    };

    return cutList;
}

function compareDesc( a, b ) {
    if ( a.length > b.length ){
        return -1;
    }
    if ( a.length < b.length ){
        return 1;
    }
    return 0;
}

function addInputInitListeners()
{
    $(':input[value="-"]').on("click",function(){
        removeInputLine(9)
    });	
    

    $(':input[value="+"]').on("click",function(){
        addInputLine(10);
    });

    $(':input[value="Cut"]').on("click",function(){
        start();
    });

    $(':input[value="Print"]').on("click",function(){
        printResults();
    });
}


function addInputListeners()
{
    
    $(':input[type="text"]').on('paste', function (event) {
        if (event.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
        event.preventDefault();
        }
    });

    $(':input[type="text"]').on("keypress",function(event){
        if(event.which <= 47 || event.which >=58){
        return false;
    }
    });
    
    $(':input[value="Copy"]').on("click",function(){	
        $('textarea').select();
        document.execCommand('copy');
    });

}

function isInputNumber(evt)
{
        
    var ch = String.fromCharCode(evt.which);
        
    if(!(/[0-9]/.test(ch))){
            evt.preventDefault();
    }
        
}

function addInputLine(lineCounter)
{
    let lineCounterPlus = lineCounter+1;
    let lineCounterMinus = lineCounter-1;
    let inputLineString = '<li><input type="text" id="input-length-'+lineCounter+'" /> <input type="text" id="input-amount-'+lineCounter+'" /><input type="button" id="input-minus-'+lineCounter+'" value="-"/><input type="button" id="input-plus-'+lineCounter+'" value="+"/></li>';
    
    $('#inputCutList').append(inputLineString);
    
    $('#input-minus-'+lineCounterMinus).remove();
    $('#input-plus-'+lineCounterMinus).remove();
    
    
    $(':input[value="-"]').on("click",function(){
    removeInputLine(lineCounter);
    });	
    
    
    $(':input[value="+"]').on("click",function(){
    addInputLine(lineCounterPlus);
    });
    
    addInputListeners();
}

function removeInputLine(lineCounter)
{
    let lineCounterPlus = lineCounter+1;
    let lineCounterMinus = lineCounter-1;
    let inputLineString;
    if(lineCounter>=2){
    inputLineString = '<input type="button" id="input-minus-'+lineCounterMinus+'" value="-"/><input type="button" id="input-plus-'+lineCounterMinus+'" value="+"/> ';
    } else {
    inputLineString = '<input type="button" id="input-plus-'+lineCounterMinus+'" value="+"/> '
    }
    
    
    $("#inputCutList li").eq(lineCounter).remove();
    
    $(inputLineString).insertAfter('#input-amount-'+lineCounterMinus+'');

    $(':input[value="-"]').on("click",function(){
    removeInputLine(lineCounterMinus)
    });	
    
    
    $(':input[value="+"]').on("click",function(){
    addInputLine(lineCounter);
    });


}

function printResults() 
{
    childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
    childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');

    childWindow.document.write(document.getElementById('results-area').value.replace(/\n/gi,'<br>'));
    childWindow.document.write('</div>');
    childWindow.document.write('</body></html>');
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
}

