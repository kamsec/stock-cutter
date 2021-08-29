// something like greedy algorithm but without recursion

function algorithm(cutList,maxCutLength)
{
    var cutListLength=cutList.length;
    var tempMem = [];
    var tempMemLength;
    var patternList = [];
    
    var i,j,sum = 0;
    
    var tempCutList = cutList.map(a => Object.assign({}, a));
    var tempCutListLength = tempCutList.length;
    
    
    var k=0;
    var sumArray = [];

    for(i=0;i<cutListLength;i++)
    {
        k=0;
        j=0;
        while(j<cutList[i].amount)
        {
            if(sumArray[k]==null)sumArray[k]=0;
            if(sumArray[k]+cutList[i].length<=maxCutLength)
            {
                patternList[k] = Array.prototype.concat(patternList[k],cutList[i].length);
                if(patternList[k][0]==null)patternList[k].shift();
                
                sumArray[k]=sumArray[k]+cutList[i].length;
                j++;
            }else{
                
            k++;
            }
        }

    }
    
    printResults(cutList,patternList,maxCutLength);
    
    function printResults(myCutList,myFinalList,myMaxCutLength)
    {
        var myCutListLength = myCutList.length;
        var myFinalListLength = myFinalList.length;
        var cutListSumCheck = 0;
        var finalListSumCheck = 0;
        var testCutListString =""
        
        var cutListString ="\n";
        for(let i=0;i<myCutListLength;i++)
        {
            cutListString = cutListString + "" + myCutList[i].length +" x " + myCutList[i].amount +" pcs.\n";
            cutListSumCheck = cutListSumCheck + myCutList[i].length * myCutList[i].amount;
            
            
            for(let j=0;j<myCutList[i].amount;j++)
            {
                testCutListString=testCutListString+myCutList[i].length+",";
            }
        }

        //testCutListString = testCutListString.substring(0, testCutListString.length - 1);
        
        var patternWaste = 0;
        var patternLength = 0;
        var allPatternsWaste = 0;
        var allPatternsLength = 0;
        var percentageWaste;
        
        var cutNo = 0;
        var finalListString ="";
        
        for(let i=0;i<myFinalListLength;i++)
        {
            var singlePatternString ="";
            patternWaste = 0;
            patternLength = 0;
            for(let j=0;j<Object.keys(myFinalList[i]).length;j++)
            {
                patternLength = patternLength + myFinalList[i][j]
                singlePatternString=singlePatternString+""+myFinalList[i][j]+", ";
                finalListSumCheck = finalListSumCheck + myFinalList[i][j];
                
            }
            patternWaste = myMaxCutLength - patternLength;
            allPatternsWaste = allPatternsWaste + patternWaste;
            allPatternsLength = allPatternsLength + patternLength;
            

            cutNo++
            if(i<9){cutNo="0"+cutNo}else{cutNo=i+1};
            
            finalListString = finalListString +"\n"+ cutNo+") "+singlePatternString+" = " +patternLength+ ": waste = " +patternWaste+";";
            
        }
        var percentageWaste = allPatternsWaste / allPatternsLength * 100;

        if(cutNo<=9){cutNo=cutNo.substring(1,cutNo.length);};
        var endingString='\n\n'+'Total material required: '+myMaxCutLength+' x '+cutNo+' pcs. = ' + (myMaxCutLength*cutNo)+'\nTotal waste: '+allPatternsWaste+' ('+parseFloat(percentageWaste).toPrecision(4)+'%)';
    
        
        var resultString = 'Length of material to be cut:\n'+myMaxCutLength+'\n\nOrder:'+cutListString+'\nMaterial loss per cut is not counted!\nCutting:'+finalListString+endingString;
        
        $("#results-area").val(resultString);	
            
    }
    
    return;
}