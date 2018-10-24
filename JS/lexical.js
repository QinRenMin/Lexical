window.onload = function() {

    /*
    *
    * #include <stdio.h>
    * {
    * int a,b;
    * a = 10;
    * b = 20;
    * printf("%d",a+b);
    *
    * */
    // #include <stdio.h>
    //      {
    //      int a,b;
    //      a = 10;
    //      b = 20;
    //      printf("%d",a+b);
    //     }

    let textArea = document.querySelector("#connect");
    let button = document.querySelector("#button");


    //获取输入值
    let getValue = '';
    let result = [];
    // let valueType = {
    //     1:'保留字',
    //     2:'标识符',
    //     3:'分隔符',
    //     4:'操作符',
    //     5:'数字'
    // };
    let valueType ={
        keyWords:["auto", "break", "case", "char", "const", "continue","let",
            "default", "do", "double", "else", "enum", "extern",
            "float", "for", "goto", "if", "int", "long",
            "register", "return", "short", "signed", "sizeof", "static",
            "struct", "switch", "typedef", "union", "unsigned", "void",
            "volatile", "while", "return",  "main", "include" ,"stdio.h"],
        identifier:[],
        operator:[ "+", "-", "*", "/", "<", "<=", ">", ">=", "=", "==",
            "!="],
        separator:[";", "(", ")", "^", ",", "\"", "\'", "#", "&",
            "&&", "|", "||", "%", "~", "<<", ">>", "[", "]", "{",
            "}", "\\",  "\?", ":", "!","."],
        number:[]
    };

    button.onclick = function () {

        if(textArea.value !== ''){
            getValue = textArea.value;
            // console.log(getValue);
        }else{
            alert('亲，请输入相关数据');
        }
        let newValue = filterValue(getValue);
        startSearch(newValue);
        //数据处理
        function filterValue(data) {
            let temp;//将每一行去除空格后，存放在数组中
            //将每一行的数据放在数组中
            data = data.split('\n');
           console.log(data);

            // let count = data.length;//记录行数

            temp =data.map((item) => {
                return item.replace(/\s/ig,'');
            });


            // console.log(temp);
            return temp;
        }

        //遍历数据
        function  startSearch(data){
            // console.log(typeof data); //intmian(){printf("%d",a)},object
            // console.log(data.length);

            data.map((item,index) => {
                //判断每一行存在的数据类型
                console.log(`第${index+1}行数据`+item); //每一行数据

                let  emIndex = item.indexOf('/');

                if(item[emIndex+1] ==='/'){
                    item = item.substring(0,emIndex-1);
                }
                let temp = [];
                let j = 0;
                let save = item;

                //匹配关键字
                valueType.keyWords.map((em) => {
                    matchDiffer(em);
                });

                //匹配操作符
                valueType.operator.map((em) => {
                    matchDiffer(em);
                });
                //匹配分隔符
                valueType.separator.map((em) => {
                    if(item.includes(em)){
                        temp[j++] = em;
                    }
                });

                //匹配前操作符号和保留字
                function matchDiffer(em){


                    if(item.includes(em)){
                        let count;
                        count = getStrCount(item,em);
                        while (count > 0){
                            if(save.includes(em)){

                                    temp[j++] = em;
                                    save=item.replace(em,'');
                                    count--;

                            }
                        }

                    }else{ return 0 }
                   // console.log("save   " +save);
                }
                //匹配数字
                findNumber(item);
                function findNumber(item){
                    let re = /\d+/g;
                    let numbers = item.match(re);
                    if(numbers!==null){
                        numbers.map((item) => {
                            temp[j++] = item;
                            valueType.number.push(item);
                            console.log(valueType.number);
                        });
                    }
                    // console.log("number "+ item.match(re).length);
                }

                // 匹配变量名等
                findString(item);
                function findString(item){
                    let re = /\w+/gi;
                    valueType.keyWords.map((keyItem)=>{
                        if(item.includes(keyItem)){
                        item = item.replace(keyItem,"");
                    }
                    });
                    valueType.number.map((numItem) => {
                        if(item.includes(numItem)){
                            item = item.replace(numItem,"");
                        }
                    });
                    // console.log("string11 " + item);
                    let arr;
                        console.log("string "+item.match(re));
                    if(item!==null){
                       arr = item.match(re);
                    }

                    if(arr!==null){
                        arr.map((item) => {
                            valueType.identifier.push(item);
                            temp[j++] =item;
                        })
                    }



                }


                //统计某字符出现的次数
                function getStrCount(str,char){
                    let re = new RegExp(char,'g');
                    let result = str.match(re);
                    return !result?0:result.length;

                }
                temp = sortIt(temp);
                //将结果按照输入顺序输出
                function sortIt(row) {
                    let rowIndex = [];
                    let rowResult =[];
                    let rowTemp = [];
                    let k = 0;
                    // console.log("item "+ item);
                    // console.log("row" + row);
                    for(let i = 0; i < row.length ; i++) {
                        rowIndex[i] =  item.indexOf(row[i]);
                        item = item.replace(row[i],' ');
                    }
                    for(let i = 0; i < rowIndex.length; i++){
                        rowResult[rowIndex[i]] = row[i];
                    }
                    for(let i = 0; i < rowResult.length;i++){

                        if(rowResult[i]!== undefined&&rowResult[i]!==''){
                            rowTemp[k++] = rowResult[i];
                        }
                    }
                    // console.log(rowIndex);
                    // console.log("result  "+typeof  rowTemp);
                    return rowTemp;

                }

                // console.log(temp);
                addTable(temp);
                function addTable(temp){
                    let table = document.getElementById('t');

                    temp.map((m) => {
                        let tr = document.createElement('tr');
                        let td1 = document.createElement("td");
                        let td2 = document.createElement("td");
                        let td3 = document.createElement("td");
                        let td4 = document.createElement("td");
                        td1.innerText = index+1;
                        td2.innerText = m;
                        td3.innerText = getIt(m);
                        td4.innerText = getType(getIt(m));
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        table.appendChild(tr);
                    });

                }
                //获得类型
                function getIt(m) {
                    for (let i = 0; i < valueType.keyWords.length;i++){
                        if(m === valueType.keyWords[i]){
                            return 1;
                        }
                    }
                    for(let i = 0; i < valueType.identifier.length; i++){
                        if(m === valueType.identifier[i]){
                            return 2;
                        }
                    }
                    for(let i = 0; i < valueType.operator.length; i++){
                        if(m === valueType.operator[i]){
                            return 3;
                        }
                    }
                    for(let i = 0; i < valueType.separator.length; i++){
                        if(m === valueType.separator[i]){
                            return 4;
                        }
                    }
                    return 5;
                }
                //获得名称

                //     1:'保留字',
                //     2:'标识符',
                //     3:'分隔符',
                //     4:'操作符',
                //     5:'数字'
                function getType(num) {
                    if (num === 1) {
                        return "保留字";
                    } else if (num === 2) {
                        return "标识符";
                    } else if (num === 3) {
                        return "分隔符";
                    } else if (num === 4) {
                        return "操作符";
                    } else if (num === 5) {
                        return "数字";
                    }
                }
            });

        }

    }
};