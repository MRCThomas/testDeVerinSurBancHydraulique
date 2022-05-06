#include "InitiationQt.h"
#include "ui_InitiationQt.h"

InitiationQt::InitiationQt(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::InitiationQt)
{
    ui->setupUi(this);
    QObject::connect(ui->pushButton, SIGNAL(clicked()), this, SLOT(onButtonClicked()));
}

InitiationQt::~InitiationQt()
{
    delete ui;
}

void InitiationQt::onButtonClicked()
{

}

void InitiationQt::loginBench()
{

}

void InitiationQt::passwordBench()
{

}



