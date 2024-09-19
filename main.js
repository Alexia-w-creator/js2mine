document.getElementById('upper-form').addEventListener("submit",checkUpperForm);
document.getElementById('bottom-form').addEventListener("submit",checkBottomForm);
let size=0;

function checkUpperForm(event)
{
    event.preventDefault();
    size=document.getElementById('upper-form').dimension.value;
    console.log(size);
    // if(size=="")
    //     document.getElementById('error').innerHTML="Заполните поле";
    // else
    // {
    //     document.getElementById('error').innerHTML="";
    // }

    let htmlText=""

    for(let i=0;i<size;i++)
    {
        htmlText+='<div class="lines">'
        for(let j=0;j<size;j++)
        {
            v = getRandom(1, 100);
            htmlText+='<input type="text" class="cell" name="cell" value="'
            htmlText+=v.toFixed(0);
            htmlText+='">';
        }

        htmlText+='</div>'
    }

    document.getElementById('matrix').innerHTML+=htmlText
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

//Получение матрицы без i-й строки и j-го столбца
function GetMatr(matr, p, i, j, n) {
    let ki, kj, di, dj;
    di = 0;
    
    for (ki = 0; ki < (n - 1); ki++) 
    { 
        if (ki == i) di = 1;
        dj = 0;
        
        for (kj = 0; kj < n - 1; kj++) 
        { 
            if (kj == j) dj = 1;
            p[ki][kj] = matr[ki + di][kj + dj];
        }
    }
}

//вычисление определителя
function Determinant(matr, n) {
    let d, k, m;
    let p = [];

    for (let i = 0; i < n; i++)
        p[i] = [];

    d = 0;
    k = 1;
    m = n - 1;

    if (n == 2) 
    {
        d = matr[0][0] * matr[1][1] -(matr[1][0] * matr[0][1]);
        return(d);
    }
    if (n > 2) 
    {
        for (let i = 0; i < n; i++) {
            GetMatr(matr, p, i, 0, n);
            d = d + k * matr[i][0] * Determinant(p, m);
            k = -k;
        }
    }

    return(d);
}

function checkBottomForm(event)
{
    event.preventDefault();

    document.getElementById('result').innerHTML=""
    elements=[];
    elements=document.getElementsByClassName('cell')

    

    let matrix=[];
    for(let i=0;i<size;i++)
        matrix[i]=[];

    let elemIndex=0;
    for(let i=0;i<size;i++)
        for(let j=0;j<size;j++)
        {
            matrix[i][j]=elements[elemIndex].value
            elemIndex+=1
        }
    console.log(matrix);

    let det = Determinant(matrix, size);
    console.log(det);
    document.getElementById('result').innerHTML+='<label for="result">Определитель матрицы: </label>';
    document.getElementById('result').innerHTML+=det;

}

