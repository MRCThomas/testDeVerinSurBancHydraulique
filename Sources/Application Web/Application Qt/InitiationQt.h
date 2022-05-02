#ifndef INITIATIONQT_H
#define INITIATIONQT_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class InitiationQt; }
QT_END_NAMESPACE

class InitiationQt : public QMainWindow
{
    Q_OBJECT

public:
    InitiationQt(QWidget *parent = nullptr);
    ~InitiationQt();

private:
    Ui::InitiationQt *ui;

public slots:
    void onButtonClicked();

public slots:
    void loginBench();

public slots:
    void passwordBench();
};
#endif // INITIATIONQT_H
