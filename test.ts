huskylens2.I2CInit()
huskylens2.switchAlgorithm(huskylens2.Algorithm.AlgorithmFaceRecognition)
basic.forever(function () {
    huskylens2.getResultFaceRecogtion()
    if (huskylens2.availableFaceRecogtion()) {
        serial.writeLine("ID" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.Id))
        serial.writeLine("NAME" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.Name))
        serial.writeLine("X" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.XCenter))
        serial.writeLine("Y" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.YCenter))
        serial.writeLine("W" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.Width))
        serial.writeLine("H" + huskylens2.cachedCenterResult(huskylens2.BasePropertyId.Height))
        serial.writeLine("----")
    }
})