# HuskyLens 2

[HUSKYLENS 2 is an easy-to-play AI vision sensor that provides a variety of AI vision functions, such as object detection, pose recognition, and instance segmentation.](https://www.dfrobot.com/product-2995.html)
## Basic usage

## Example
HuskyLens 2 offers a very detailed tutorial on using MakeCode.(https://wiki.dfrobot.com/Tutorial%20for%20HUSKYLENS%202%20and%20micro:bit%20Graphical%20Programming(MakeCode))

* HuskyLens 2 Init I2C and select pattern.

```blocks
    huskylensV2.I2CInit()
    huskylensV2.switchAlgorithm(huskylensV2.Algorithm.ALGORITHM_FACE_RECOGNITION)

```

* HuskyLens 2 collects data for facial recognition and outputs it.

```blocks
    basic.forever(function () {
        huskylensV2.getResultFaceRecogtion()
        if (huskylensV2.availableFaceRecogtion()) {
            serial.writeLine("ID:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.ID))
            serial.writeLine("NAME:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.Name))
            serial.writeLine("X:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.XCenter))
            serial.writeLine("Y:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.YCenter))
            serial.writeLine("W:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.Width))
            serial.writeLine("H:" + huskylensV2.getCachedCenterResult(huskylensV2.BasePropertyID.Height))
            serial.writeLine("----")
        }
    })

```


## License

MIT

Copyright (c) 2020, microbit/micropython Chinese community  

## Supported targets

* for PXT/microbit