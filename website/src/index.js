// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import {
    GiftsFactory
} from './giftsFactory.js'
import $ from 'jquery'

// TODO
$(document).ready(function () {
    const gf = new GiftsFactory();
    $('#Small').click(async function () {
        try {
            $('#Result').html("");
            await gf.displayGiftStatus("Small")
            $('#Result').html(gf.message);
            $('#Sled').html(gf.sled.displaySled())
        } catch (err) {
            $('#Result').html(err);
        }
    });

    $('#Normal').click(async function () {
        try {
            $('#Result').html("");
            await gf.displayGiftStatus("Normal")
            $('#Result').html(gf.message);
            $('#Sled').html(gf.sled.displaySled())
        } catch (err) {
            $('#Result').html(err);
        }
    });

    $('#Big').click(async function () {
        try {
            $('#Result').html("");
            await gf.displayGiftStatus("Big")
            $('#Result').html(gf.message);
            $('#Sled').html(gf.sled.displaySled())
        } catch (err) {
            $('#Result').html(err);
        }
    });

    $('#Deliver').click(async function () {
        try {
            $('#Result').html("");
            await gf.displaySledStatus()
            $('#Result').html(gf.message);
            $('#Sled').html(gf.sled.displaySled())
        } catch (err) {
            $('#Result').html(err);
        }
    });

    $('#Reset').click(async function () {
        try {
            $('#Result').html("");
            await gf.reset()
            $('#Result').html(gf.message);
            $('#Sled').html(gf.sled.displaySled())
        } catch (err) {
            $('#Result').html(err);
        }
    });
});