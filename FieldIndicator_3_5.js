document.addEventListener("DOMContentLoaded", function () {
    const colorButtons = document.querySelectorAll(".color-button");
    const spotNameContainer_L = document.querySelector(".spotNameContainer-L");
    const spotNameContainer_R = document.querySelector(".spotNameContainer-R");
    const resetButton = document.getElementById("reset-button");
    const redTotal = document.getElementById("red-total");
    const blueTotal = document.getElementById("blue-total");
    const redTotal_theoretical = document.getElementById("red-total-theoretical");
    const blueTotal_theoretical = document.getElementById("blue-total-theoretical");
    const mixFruits_perfectState = document.getElementById("mixFruits_perfectState");
    const grape_perfectState = document.getElementById("grape_perfectState");
    const blueberry_perfectState = document.getElementById("blueberry_perfectState");
    const safetyMargin = document.getElementById("safetyMargin");
    const differencePoints = document.getElementById("differencePoints");
    const toggleSwitch = document.getElementById("toggle-switch");
    const toggleSwitch2 = document.getElementById("toggle-switch-2");
    const toggleLabel2 = document.querySelector('[for="toggle-switch-2"]');
    const toggleSwitch3 = document.getElementById("toggle-switch-3");
    const toggleLabel3 = document.querySelector('[for=toggle-switch-3');
    const fruitScores = {
        "mixFruits" : {get_points: 70, maxCount: 2},
        "grape" : {get_points: 50, maxCount: 2},
        "blueberry" : {get_points: 40, maxCount: 4},
    };
    const fruitPriority = {
        "mixFruits" : 0,
        "grape" : 1,
        "blueberry" : 2,
    };
    const selectedFruits = {
        "mixFruits" : 0,
        "grape" : 0,
        "blueberry" : 0,
    };
    // const sortedFruits = Object.keys(fruitScores).sort((a, b) => {
    //     return fruitScores[b].points - fruitScores[a].points;
    // });
    const sortedFruits = Object.keys(fruitPriority).sort((a, b) => {
        return fruitPriority[a] - fruitPriority[b];
    });
    let redSum = 0;
    let blueSum = 0;
    let redSum_theoretical = 0;
    let blueSum_theoretical = 0;
    let difference = 0;
    const safetyMarginDesu = 50;
    safetyMargin.textContent = safetyMarginDesu;
    let mixFruits_State = 0;
    let grape_State = 0;
    let blueberry_State = 0;
    let totalPoints = 0;
    let index = 0;
    let useMixFruits = 0;
    let useGrape = 0;
    let useBlueberry = 0;
    let GBcheck = 0;

    let currentColor = "white";
    // let toggleState = true; // デフォルトの状態を赤色に変更
    let toggleState = toggleSwitch.checked; // トグルスイッチの状態を保持
    // toggle-switch-2の初期状態を設定（HARVEST）
    let toggleSwitch2State = "BASKET";
    let toggleSwitch3State = "PRIORITY";

    // オンのテキストとオフのテキストを定義
    const onText = "HARVEST";
    const offText = "BASKET";

    const onText2 = "PRIORITY";
    const offText2 = "MINIMUM";

    // 初期状態でトグルスイッチのスタイルを設定
    updateToggleSwitchStyle();
    createSpots();
    updateSpotNameContainerLabel_L();
    updateSpotNameContainerLabel_R();

    toggleSwitch.addEventListener("change", () => {
        toggleState = toggleSwitch.checked; //トグルスイッチの状態を更新
        updateToggleSwitchStyle(); //トグルスイッチのスタイルを更新
        updateSpotNameContainerLabel_L();
        updateSpotNameContainerLabel_R();
    });

    toggleSwitch2.addEventListener("change", () => {
        if (toggleSwitch2.checked) {
            toggleLabel2.style.backgroundColor = "orange"; // オンの場合の背景色を設定
            toggleLabel2.textContent = offText; // オンの場合のテキストを設定
        } else {
            toggleLabel2.style.backgroundColor = "green"; // オフの場合の背景色を設定
            toggleLabel2.textContent = onText; // オフの場合のテキストを設定
        }
    });

    if (toggleSwitch2.checked) {
        toggleLabel2.style.backgroundColor = "orange"; // オンの場合の背景色を設定
        toggleLabel2.textContent = offText; // オンの場合のテキストを設定
    } else {
        toggleLabel2.style.backgroundColor = "green"; // オフの場合の背景色を設定
        toggleLabel2.textContent = onText; // オフの場合のテキストを設定
    }

    toggleSwitch3.addEventListener("change", () => {
        if (toggleSwitch3.checked) {
            toggleLabel3.style.backgroundColor = "lightblue"; // オンの場合の背景色を設定
            toggleLabel3.textContent = offText2; // オンの場合のテキストを設定
        } else {
            toggleLabel3.style.backgroundColor = "gold"; // オフの場合の背景色を設定
            toggleLabel3.textContent = onText2; // オフの場合のテキストを設定
        }
    });
    
    if (toggleSwitch3.checked) {
        toggleLabel3.style.backgroundColor = "lightblue"; // オンの場合の背景色を設定
        toggleLabel3.textContent = offText2; // オンの場合のテキストを設定
    } else {
        toggleLabel3.style.backgroundColor = "gold"; // オフの場合の背景色を設定
        toggleLabel3.textContent = onText2; // オフの場合のテキストを設定
    }

    function updateToggleSwitchStyle() {
        if (toggleState) {
            toggleSwitch.style.backgroundColor = "#FF0000"; // 赤色黄色
        } else {
            toggleSwitch.style.backgroundColor = "#0000FF"; // 青色
        }
    }

    colorButtons.forEach((button) => {
        const initialColor = button.getAttribute("data-initial-color");
        button.style.backgroundColor = initialColor;
        if (initialColor === "red") {
            // 初期状態が赤色のボタンは赤い状態からスタート
            button.setAttribute("data-color", "red");
            button.setAttribute("data-state", "1");
            redSum += parseInt(button.textContent);
        }
        button.addEventListener("click", () => {
            
            const currentState = parseInt(button.getAttribute("data-state"));
            const points = parseInt(button.textContent);

            if (toggleState) {
                if (toggleSwitch2State === "BASKET"){
                    // トグルがONの場合，青ゾーン
                    if (currentState === 0) {
                        button.style.backgroundColor = "blue";
                        button.setAttribute("data-color", "blue");
                        button.setAttribute("data-state", "1");
                        blueSum += 1;
                        blueSum_theoretical += points;
                        // blueSum += parseInt(button.textContent);
                    } else if (currentState === 1) {
                        button.style.backgroundColor = "red";
                        button.setAttribute("data-color", "red");
                        button.setAttribute("data-state", "2");
                        blueSum -= 1;
                        redSum += 1;
                        blueSum_theoretical -= points;
                        redSum_theoretical += points;
                        // blueSum -= parseInt(button.textContent);
                        // redSum += parseInt(button.textContent);
                    } else if (currentState === 2) {
                        button.style.backgroundColor = initialColor;
                        button.setAttribute("data-color", initialColor);
                        button.setAttribute("data-state", "0");
                        // redSum -= parseInt(button.textContent);
                        redSum -= 1;
                        redSum_theoretical -= points;
                    }
                }
                else if (toggleSwitch2State === "HARVEST"){
                    // トグルがONの場合，青ゾーン
                    if (currentState === 0) {
                        button.style.backgroundColor = "blue";
                        button.setAttribute("data-color", "blue");
                        button.setAttribute("data-state", "1");
                        blueSum += (points - 1);
                        // blueSum += parseInt(button.textContent);
                    } else if (currentState === 1) {
                        // button.style.backgroundColor = "red";
                        // button.setAttribute("data-color", "red");
                        button.setAttribute("data-state", "2");
                        // blueSum -= (points - 1);
                        blueSum += (points - 1);
                        // blueSum -= parseInt(button.textContent);
                        // redSum += parseInt(button.textContent);
                    } else if (currentState === 2) {
                        // button.style.backgroundColor = initialColor;
                        // button.setAttribute("data-color", initialColor);
                        button.style.backgroundColor = "red";
                        button.setAttribute("data-color", "red");
                        button.setAttribute("data-state", "0");
                        // redSum -= parseInt(button.textContent);
                        redSum += (points -1);
                    }
                }
                difference = blueSum_theoretical - redSum_theoretical;
            } else {
                if (toggleSwitch2State === "BASKET"){
                // トグルがOFFの場合，赤ゾーン
                    if (currentState === 0) {
                        button.style.backgroundColor = "red";
                        button.setAttribute("data-color", "red");
                        button.setAttribute("data-state", "1");
                        redSum += 1;
                        redSum_theoretical += points;
                        // redSum += parseInt(button.textContent);
                    } else if (currentState === 1) {
                        button.style.backgroundColor = "blue";
                        button.setAttribute("data-color", "blue");
                        button.setAttribute("data-state", "2");
                        redSum -= 1;
                        blueSum += 1;
                        redSum_theoretical -= points;
                        blueSum_theoretical += points;
                        // redSum -= parseInt(button.textContent);
                        // blueSum += parseInt(button.textContent);
                    } else if (currentState === 2) {
                        button.style.backgroundColor = initialColor;
                        button.setAttribute("data-color", initialColor);
                        button.setAttribute("data-state", "0");
                        blueSum -= 1;
                        blueSum_theoretical -= points;
                        // blueSum -= parseInt(button.textContent);
                    }
                }
                else if (toggleSwitch2State === "HARVEST"){
                // トグルがOFFの場合，赤ゾーン
                    if (currentState === 0) {
                        button.style.backgroundColor = "red";
                        button.setAttribute("data-color", "red");
                        button.setAttribute("data-state", "1");
                        redSum += (points - 1);
                        // redSum += parseInt(button.textContent);
                    } else if (currentState === 1) {
                        // button.style.backgroundColor = "blue";
                        // button.setAttribute("data-color", "blue");
                        button.setAttribute("data-state", "2");
                        // redSum -= (points - 1);
                        redSum += (points - 1);
                        // redSum -= parseInt(button.textContent);
                        // blueSum += parseInt(button.textContent);
                    } else if (currentState === 2) {
                        // button.style.backgroundColor = initialColor;
                        // button.setAttribute("data-color", initialColor);
                        button.style.backgroundColor = "blue";
                        button.setAttribute("data-color", "blue");
                        button.setAttribute("data-state", "0");
                        blueSum += (points - 1);
                        // blueSum -= parseInt(button.textContent);
                    }
                }
                difference = redSum_theoretical - blueSum_theoretical;
            } // 赤と青の色の条件などが逆な気がするが，逆にするとうまくいく
            updateTotals();
            if(toggleSwitch3State == "PRIORITY"){
                updateTheoreticalsPriority();
            }else if (toggleSwitch3State == "MINIMUM"){
                updateTheoreticalsMinimum();
            }
        });
    });

    toggleSwitch2.addEventListener("change", () => {
        toggleSwitch2State = toggleSwitch2.checked ? "HARVEST" : "BASKET";
    });

    toggleSwitch3.addEventListener("change", () => {
        toggleSwitch3State = toggleSwitch3.checked ? "MINIMUM" : "PRIORITY";
    });

    function createSquare_L(label) {
        const square_L = document.createElement("div");
        square_L.className = "square_L";
        square_L.textContent = label;
        return square_L;
    }

    function createSquare_R(label) {
        const square_R = document.createElement("div");
        square_R.className = "square_R";
        square_R.textContent = label;
        return square_R;
    }

    function createSpots(){
        const squareLabels_L = toggleState ? ["A", "B"] : ["D", "C"];
        squareLabels_L.forEach((label) => {
            const square_L = createSquare_L(label);
            spotNameContainer_L.appendChild(square_L);
        });

        const squareLabels_R = toggleState ? ["C", "D"] : ["B", "A"];
        squareLabels_R.forEach((label) => {
            const square_R = createSquare_R(label);
            spotNameContainer_R.appendChild(square_R);
        });
    }

    function updateTotals() {
        redTotal.textContent = redSum;
        blueTotal.textContent = blueSum;
        redTotal_theoretical.textContent = redSum_theoretical;
        blueTotal_theoretical.textContent = blueSum_theoretical;
        // difference_theoretical = redSum_theoretical - blueSum_theoretical;
        differencePoints.textContent = difference;
        safetyMargin.textContent = safetyMarginDesu;
    }

    function updateTheoreticalsPriority(){
        console.log("updateTheoreticals 関数が呼び出されました");

        console.log("Before updateTheoreticals:", selectedFruits);

        const safetyDifference = safetyMarginDesu - difference;
        const differenceDesu = difference - safetyMarginDesu;

        const fruitName = sortedFruits[index];
        const fruitPoints = fruitScores[fruitName].get_points;
        const maxCount = fruitScores[fruitName].maxCount;

        if (difference < 0 || safetyMarginDesu > difference){
            while (totalPoints < safetyDifference && index < sortedFruits.length) {
                console.log("aiueo:",fruitName);
                console.log("temp:",selectedFruits[fruitName]);
                console.log("oh",fruitScores[fruitName].maxCount);

                if (selectedFruits[fruitName] < maxCount) {
                    if (!selectedFruits[fruitName]) {
                        selectedFruits[fruitName] = 1;
                        console.log("!");
                        console.log("god:",selectedFruits[fruitName]);
                    } else {
                        selectedFruits[fruitName]++;
                        console.log("+");
                        console.log("king:",selectedFruits[fruitName]);
                    }
                    totalPoints += fruitPoints;
                    console.log("total:",totalPoints);
                }else{
                    index++;
                }
            }
        }else if(difference > safetyMarginDesu){
            while (differenceDesu > 40){
                if (differenceDesu > 70 && selectedFruits["mixFruits"] != 0){
                    selectedFruits["mixFruits"] -- ;
                }else if (differenceDesu > 50 && selectedFruits["grape"] != 0){
                    selectedFruits["grape"] -- ;
                }else if (differenceDesu > 40 && selectedFruits["blueberry"] != 0){
                    selectedFruits["blueberry"] -- ;
                }break;
            }
        }

        // if (selectedFruits["mixFruits"]) {
        //     mixFruits_State = selectedFruits["mixFruits"];
        // }
        // if (selectedFruits["grape"]) {
        //     grape_State = selectedFruits["grape"];
        // }
        // if (selectedFruits["blueberry"]) {
        //     blueberry_State = selectedFruits["blueberry"];
        // }
        mixFruits_State = selectedFruits["mixFruits"];
        grape_State = selectedFruits["grape"];
        blueberry_State = selectedFruits["blueberry"];

        mixFruits_perfectState.textContent = mixFruits_State;
        grape_perfectState.textContent = grape_State;
        blueberry_perfectState.textContent = blueberry_State;   
    }

    function updateTheoreticalsMinimum(){
        const safetyDifference = safetyMarginDesu - difference;
        const differenceDesu = difference - safetyMarginDesu;

        const maxCountMixFruits = fruitScores["mixFruits"].maxCount;
        const maxCountGrape = fruitScores["grape"].maxCount;
        const maxCountBlueberry = fruitScores["blueberry"].maxCount;

        // totalPoints < safetyDifference
        // 

        if (difference < 0 || safetyMarginDesu > difference){
            while (safetyMarginDesu > difference) {
                if (selectedFruits["mixFruits"] == 0 && selectedFruits["grape"] == 0 && selectedFruits["blueberry"] == 0){
                    selectedFruits["mixFruits"] ++;
                    useMixFruits ++;
                    totalPoints += 70;
                }else if (safetyDifference >= 40 && useBlueberry <= maxCountBlueberry && GBcheck %2 == 0){
                    selectedFruits["blueberry"] ++;
                    useBlueberry ++;
                    totalPoints += 40;
                    GBcheck ++;
                }else if (safetyDifference >= 50 && useGrape <= maxCountGrape && GBcheck %2 == 1){
                    selectedFruits["grape"] ++;
                    useGrape ++;
                    totalPoints += 50;
                    GBcheck ++;
                }else if (safetyDifference > 70 && useMixFruits <= maxCountMixFruits){
                    selectedFruits["mixFruits"] ++;
                    useMixFruits ++;
                    totalPoints += 70;
                }break;
            }
        }else if(difference > safetyMarginDesu){
            while (differenceDesu > 40){
                if (differenceDesu > 70 && selectedFruits["mixFruits"] != 0){
                    selectedFruits["mixFruits"] -- ;
                }else if (differenceDesu > 50 && selectedFruits["grape"] != 0){
                    selectedFruits["grape"] -- ;
                }else if (differenceDesu > 40 && selectedFruits["blueberry"] != 0){
                    selectedFruits["blueberry"] -- ;
                }break;
            }
        }

        // if (selectedFruits["mixFruits"]) {
        //     mixFruits_State = selectedFruits["mixFruits"];
        // }
        // if (selectedFruits["grape"]) {
        //     grape_State = selectedFruits["grape"];
        // }
        // if (selectedFruits["blueberry"]) {
        //     blueberry_State = selectedFruits["blueberry"];
        // }
        mixFruits_State = selectedFruits["mixFruits"];
        grape_State = selectedFruits["grape"];
        blueberry_State = selectedFruits["blueberry"];

        mixFruits_perfectState.textContent = mixFruits_State;
        grape_perfectState.textContent = grape_State;
        blueberry_perfectState.textContent = blueberry_State;   
    }

    resetButton.addEventListener("click", () => {
        colorButtons.forEach((button) => {
            const initialColor = button.getAttribute("data-initial-color");
            button.style.backgroundColor = initialColor;
            button.setAttribute("data-color", initialColor);
            button.setAttribute("data-state", "0");
        });
        redSum = 0;
        blueSum = 0;
        redSum_theoretical = 0;
        blueSum_theoretical = 0;
        difference = 0;

        selectedFruits["mixFruits"] = 0;
        selectedFruits["grape"] = 0;
        selectedFruits["blueberry"] = 0;

        // mixFruits_State、grape_State、blueberry_Stateを0にリセット
        mixFruits_State = 0;
        grape_State = 0;
        blueberry_State = 0;

        totalPoints = 0;

        mixFruits_perfectState.textContent = mixFruits_State;
        grape_perfectState.textContent = grape_State;
        blueberry_perfectState.textContent = blueberry_State;
        
        updateTotals();
        index = 0;
        useMixFruits = 0;
        useGrape = 0;
        useBlueberry = 0;
        GBcheck = 0;
        // updateTheoreticals();

        updateSpotNameContainerLabel_L();
        updateSpotNameContainerLabel_R();
    });

    function updateSpotNameContainerLabel_L(){
        const squareLabels_L = toggleState ? ["A", "B"] : ["D", "C"];
        const squares_L = document.querySelectorAll(".square_L");
        squares_L.forEach((square_L, index) => {
            square_L.textContent = squareLabels_L[index];
        });
    }
    function updateSpotNameContainerLabel_R(){
        const squareLabels_R = toggleState ? ["C", "D"] : ["B", "A"];
        const squares_R = document.querySelectorAll(".square_R");
        squares_R.forEach((square_R, index) => {
            square_R.textContent = squareLabels_R[index];
        });
    }
});
