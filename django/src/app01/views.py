from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from .models import Friendship, ChatMessage
from .forms import ChatMessageForm
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.models import User


# Create your views here.
def chat(request):
    group_num = request.GET.get('group_num')
    return render(request, 'chat.html', {'group_num': group_num})

def friendchat(request):
    group_num = request.GET.get('group_num')
    return render(request, 'friend_chat.html', {'group_num': group_num})

@login_required
def send_message(request, receiver_id):
    receiver = get_object_or_404(User, id=receiver_id)
    if request.method == 'POST':
        form = ChatMessageForm(request.POST)
        if form.is_valid():
            chat_message = form.save(commit=False)
            chat_message.sender = request.user
            chat_message.receiver = receiver
            chat_message.save()
            return redirect('chat_history', receiver_id=receiver.id)
    else:
        form = ChatMessageForm()
    return render(request, 'send_message.html', {'form': form, 'receiver': receiver})

@login_required
def chat_history(request, receiver_id):
    receiver = get_object_or_404(User, id=receiver_id)
    messages = ChatMessage.objects.filter(
        (Q(sender=request.user) & Q(receiver=receiver)) | 
        (Q(sender=receiver) & Q(receiver=request.user))
    ).order_by('timestamp')
    return render(request, 'chat_history.html', {'messages': messages, 'receiver': receiver})
