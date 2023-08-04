    // GASでスプレッドシートデータを読み出す
    const endpoint = "https://script.google.com/macros/s/AKfycbyB7HA2kJAz9AcAcP0vEB8-0ucGCytpb9CPCOOtjX4axwLfjq62dKCKjqnsvfU_Chx8/exec";
    var arr = [240, 1190, 2500, 5500, 200000];

    function updateList(){
        //APIを使って非同期データを取得する
        fetch(endpoint)
            .then(response => response.json())
            // 成功した処理
            .then(items => {
                //JSONから配列に変換
                // 指定フィルター
                titleword = document.getElementById("title").value;
                exhibitword = document.getElementById("exhibit").value;
                portraitlandscape = document.getElementById("portraitlandscape").value;
                remarksword = document.getElementById("remarks").value;
                areaupper =  document.getElementById("area").value;
                let areaunder = 0;
                if (areaupper != "all"){
                    for(let i=0; i<arr.length; ++i){
                        if (arr[i] >= areaupper){
                            break;
                        }
                        areaunder = arr[i];
                    }
                }
                // 表示する画像
                let txt = '<tr>';
                let count = 0;
                for(let i = 1; i < items.length; i++){
                    let fname = 'img/N' + i + '.jpg';
                    let title = items[i-1]["作品名"].trim();
                    let size = items[i-1]["サイズ"].split('x');
                    let tate = Number(size[0]);
                    let yoko = Number(size[1]);
                    let area = tate * yoko;
                    let exhibit = items[i-1]["出展先"].trim();
                    let remarks = items[i-1]["備考"].trim();
                    if (!title.includes(titleword)) {
                        continue;
                    }
                    if (!exhibit.includes(exhibitword)) {
                        continue;
                    }
                    if (areaupper != "all"){
                        if (!((area >= areaunder) && (area <= areaupper)))
                        {
                            continue;
                        }
                    }
                    if (portraitlandscape == "縦長" && tate <= yoko){
                        continue;
                    }
                    else if (portraitlandscape == "横長" && tate >= yoko){
                        continue;
                    }
                    if (!remarks.includes(remarksword)) {
                        continue;
                    }

                    count += 1;
                    txt += '<td><img src=' + fname + ' width=200>';
                    txt += '<br>【' + i + '】' + title + '<br>' + size[0] + ' x ' + size[1] + '</td>';
                    if (count % 5 == 0){
                        txt += '</tr><tr>';
                        count = 0;
                    }
                }
                txt += '</tr>'
                document.getElementById("imglist").innerHTML = txt;

            });
        }
