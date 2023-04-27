document.getElementById('upper-form').addEventListener("submit",checkUpperForm);
document.getElementById('bottom-form').addEventListener("submit",checkBottomForm);
let size=0;

function checkUpperForm(event)
{
    event.preventDefault();
    // size=document.getElementById('upper-form').dimension.value;
    size=document.getElementById('upper-form').dimension.value;
    console.log(size);
    if(size=="")
        document.getElementById('error').innerHTML="Заполните поле";
    else
    {
        document.getElementById('error').innerHTML="";
    }

    let htmlText=""

    for(let i=0;i<size;i++)
    {
        htmlText+='<div class="lines">'
        for(let j=0;j<size;j++)
        {
            htmlText+='<input type="text" class="cell" name="cell" value="0">'
        }

        htmlText+='</div>'
    }

    document.getElementById('matrix').setHTML(htmlText)
}

// Получение матрицы без i-й строки и j-го столбца
function GetMatr(mas, p, i, j, m) {
    let ki, kj, di, dj;
    di = 0;
    for (ki = 0; ki < (m - 1); ki++) { // проверка индекса строки
        if (ki == i) di = 1;
        dj = 0;
        for (kj = 0; kj < m - 1; kj++) { // проверка индекса столбца
            if (kj == j) dj = 1;
            p[ki][kj] = mas[ki + di][kj + dj];
        }
    }
}
// Рекурсивное вычисление определителя
function Determinant(mas, m) {
    let i, j, d, k, n;
    let p = [];
    for (i = 0; i < m; i++)
        p[i] = [];
    j = 0; d = 0;
    k = 1; //(-1) в степени i
    n = m - 1;
    if (m == 2) {
        d = mas[0][0] * mas[1][1] -(mas[1][0] * mas[0][1]);
        return(d);
    }
    if (m > 2) {
        for (i = 0; i < m; i++) {
            GetMatr(mas, p, i, 0, m);
            d = d + k * mas[i][0] * Determinant(p, n);
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
    document.getElementById('result').innerHTML+=det;

}

