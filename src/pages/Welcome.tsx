import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Divider, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import { getNewAnnouncementUsingGET } from '@/services/lib-backend/announcementController';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [announcement, setAnnouncement] = useState<API.AnnouncementVO>();
  const loadData = async () => {
    const res = await getNewAnnouncementUsingGET();
    if (res.code === 0) {
      setAnnouncement(res.data);
    } else {
      message.error('加载公告失败');
    }
  };
  useEffect(() => {
    loadData();
  }, [token]);
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 图书馆管理系统
          </div>
        </div>
      </Card>
      <Divider />
      <Card title="今日公告" bordered={false}>
        <p>{announcement?.content ?? '暂无公告'}</p>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
