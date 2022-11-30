import json
import boto3
import os


def lambda_handler(event, context):
    message = {"foo": "bar"}
    client = boto3.client('sns')
    target_topic_arn = os.environ['sns']

    response = client.publish(
        TargetArn=target_topic_arn,
        Message=json.dumps({'default': json.dumps(message)}),
        MessageStructure='json'
    )
    