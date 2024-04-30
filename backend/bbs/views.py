from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TopicSerializer
from .models import Topic

class TopicView(viewsets.ModelViewSet):
    serializer_class    = TopicSerializer
    queryset            = Topic.objects.all()





"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import TopicSerializer
from .models import Topic

class TopicView(APIView):
    def get(self, request):
        # 全てのTopicを取得します
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request):
        # 新しいTopicを作成します
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, pk):
        # 特定のTopicを取得します
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            raise Http404

    def put(self, request, pk):
        # 特定のTopicを更新します
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # 特定のTopicを削除します
        topic = self.get_object(pk)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

"""
