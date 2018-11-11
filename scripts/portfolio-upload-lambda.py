import boto3
import io
import zipfile
import mimetypes


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic(
        'arn:aws:sns:us-east-1:529231494542:deployPortfolioTopic')

    try:
        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('portfolio.traveltart.in')
        for obj in portfolio_bucket.objects.all():
            print(obj.key)

        build_bucket = s3.Bucket('portfoliobuild.traveltart.in')

        portfolio_zip = io.BytesIO()
        build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                mime_type = ''
                if nm.endswith('woff'):
                    mime_type = 'font/woff'
                elif nm.endswith('woff2'):
                    mime_type = 'font/woff2'
                elif nm.endswith('json'):
                    mime_type = 'application/json'
                else:
                    mime_type = mimetypes.guess_type(nm)[0]
                portfolio_bucket.upload_fileobj(obj, nm,
                                                ExtraArgs={'ContentType': mime_type})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print('Job Done')
        topic.publish(Subject='Portfolio Deployed',
                      Message='Portfolio deployed succesfully!!')
    except:
        topic.publish(Subject='Portfolio Deployed Failed',
                      Message='Portfolio not deployed succesfully!!')
        raise
    return 'hello lambda'


# lambda_handler('', '')
