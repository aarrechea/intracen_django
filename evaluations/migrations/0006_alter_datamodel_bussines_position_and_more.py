# Generated by Django 4.1.5 on 2023-03-06 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluations', '0005_alter_datamodel_plans_to_export'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datamodel',
            name='bussines_position',
            field=models.CharField(default='Empty', max_length=100),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='ceo_title',
            field=models.SmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='comments',
            field=models.TextField(default='Empty', max_length=255),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='email',
            field=models.CharField(default='Empty', max_length=100),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='family_name',
            field=models.CharField(default='Empty', max_length=100),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='gender',
            field=models.SmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='given_name',
            field=models.CharField(default='Empty', max_length=100),
        ),
        migrations.AlterField(
            model_name='datamodel',
            name='telephone',
            field=models.CharField(default='Empty', max_length=20),
        ),
    ]
