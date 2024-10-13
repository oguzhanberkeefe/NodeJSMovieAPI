module.exports = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    if (req.method === 'POST') return res.status(500).json(`Error: ${err.message}`);
    res.status(err.status || 500);
    res.render('error');

};