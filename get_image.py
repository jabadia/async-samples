import requests
import time
from PIL import Image

url = 'http://1.bp.blogspot.com/-pGJESK_kbYY/UZz3B8YQAnI/AAAAAAAA3J4/VGKfj0I-a34/s1600/David+Hasselhoff.jpg'
path = 'david.jpg'
thumbnail_path = 'david-thumb.jpg'
size = (128, 128)

t0 = time.time()
r = requests.get(url, stream=True)
t1 = time.time()
if r.status_code == 200:
	t2 = time.time()
	with open(path, 'wb') as f:
	    for chunk in r.iter_content(1024):
	        f.write(chunk)
	t3 = time.time()
	im = Image.open(path)
	t4 = time.time()
	im.thumbnail(size, Image.ANTIALIAS)
	t5 = time.time()
	im.save(thumbnail_path, "JPEG")
	t6 = time.time()
	# pic = CoolPics(img=path, thumbnail=thumbnail_path)
	# pic.save()

print("requests.get       : %.3fms" % ((t1-t0) * 1000,))
print("stream & write file: %.3fms" % ((t3-t2) * 1000,))
print("open image file    : %.3fms" % ((t4-t3) * 1000,))
print("resize image       : %.3fms" % ((t5-t4) * 1000,))
print("save image         : %.3fms" % ((t6-t5) * 1000,))